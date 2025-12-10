import os
import time
import yaml
import logging
from flask import Flask, render_template, request, jsonify
from kubernetes import client, config
from prometheus_client import generate_latest, CollectorRegistry, Gauge
import numpy as np
from sklearn.linear_model import LinearRegression

# -----------------------------------------------------------------------------
# App Setup
# -----------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO)
app = Flask(__name__, template_folder='templates', static_folder='static')

# -----------------------------------------------------------------------------
# YAML Loader
# -----------------------------------------------------------------------------
STATUS_YAML = os.environ.get("STATUS_YAML", "status.yml")

def load_yaml():
    try:
        with open(STATUS_YAML, "r") as f:
            return yaml.safe_load(f)
    except Exception as e:
        logging.error(f"Failed to load YAML: {e}")
        return {"services": []}

# -----------------------------------------------------------------------------
# Kubernetes Client
# -----------------------------------------------------------------------------
def get_k8s_client():
    try:
        config.load_incluster_config()
    except:
        try:
            config.load_kube_config()
        except:
            return None
    return client.CoreV1Api()

# -----------------------------------------------------------------------------
# Fetch Cluster State
# -----------------------------------------------------------------------------
def get_k8s_state():
    api = get_k8s_client()
    if api is None:
        return [], []

    pods = []
    services = []

    try:
        pod_list = api.list_pod_for_all_namespaces()
        for p in pod_list.items:
            pods.append({
                "name": p.metadata.name,
                "namespace": p.metadata.namespace,
                "phase": p.status.phase,
                "restarts": sum(cs.restart_count for cs in (p.status.container_statuses or []))
            })

        svc_list = api.list_service_for_all_namespaces()
        for s in svc_list.items:
            services.append({
                "name": s.metadata.name,
                "namespace": s.metadata.namespace,
                "type": s.spec.type
            })
    except Exception as e:
        logging.error(f"K8s error: {e}")

    return pods, services

# -----------------------------------------------------------------------------
# AI Insights
# -----------------------------------------------------------------------------
def generate_ai_insights(pods, yaml_cfg):
    insights = []

    unhealthy = [p for p in pods if p["phase"] != "Running" or p["restarts"] > 2]
    if unhealthy:
        insights.append({
            "level": "warning",
            "message": "Some pods appear unhealthy (CrashLoop or high restarts)."
        })

    down = [s for s in yaml_cfg.get("services", []) if s.get("status") == "down"]
    if down:
        insights.append({
            "level": "error",
            "message": "One or more services are DOWN according to YAML config."
        })

    return insights

# -----------------------------------------------------------------------------
# Train AI Model for Grade Prediction
# -----------------------------------------------------------------------------
def train_model():
    X = np.random.rand(300, 3) * np.array([6, 10, 100])
    y = (X[:, 0] * 6) + (X[:, 1] * 3) + (X[:, 2] * 0.2) + np.random.normal(0, 5, 300)

    model = LinearRegression()
    model.fit(X, y)
    return model

grade_model = train_model()

# -----------------------------------------------------------------------------
# Prometheus Metrics
# -----------------------------------------------------------------------------
registry = CollectorRegistry()
pod_gauge = Gauge("pod_count", "Total pods", registry=registry)
svc_gauge = Gauge("service_count", "Total services", registry=registry)

# -----------------------------------------------------------------------------
# ROUTES
# -----------------------------------------------------------------------------
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/status")
def status():
    return jsonify(load_yaml())

@app.route("/dashboard")
def dashboard_page():
    return render_template("dashboard.html")

@app.route("/api/dashboard")
def dashboard_api():
    yaml_data = load_yaml()
    pods, services = get_k8s_state()

    pod_gauge.set(len(pods))
    svc_gauge.set(len(services))

    insights = generate_ai_insights(pods, yaml_data)

    return jsonify({
        "yaml": yaml_data,
        "pods": pods,
        "services": services,
        "insights": insights,
        "timestamp": time.time()
    })

@app.route("/predict", methods=["GET", "POST"])
def predict():
    if request.method == "GET":
        return render_template("predict.html")

    try:
        hours = float(request.form.get("study_hours", 0))
        assignments = float(request.form.get("assignments", 0))
        attendance = float(request.form.get("attendance", 0))
    except:
        return jsonify({"error": "Invalid input"}), 400

    X = np.array([[hours, assignments, attendance]])
    pred = float(np.clip(grade_model.predict(X)[0], 0, 100))

    advice = []
    if hours < 3:
        advice.append("Increase study hours.")
    if assignments < 5:
        advice.append("Complete more assignments.")
    if attendance < 75:
        advice.append("Improve attendance.")

    return jsonify({
        "predicted_grade": round(pred, 1),
        "advice": advice
    })

@app.route("/metrics")
def metrics():
    return generate_latest(registry)

@app.route("/healthz")
def health():
    return jsonify({"status": "ok"})

# -----------------------------------------------------------------------------
# Entry Point
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
