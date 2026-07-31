from flask import Blueprint, request, jsonify
from models.progress import LabProgress
from models.db import db

labs = Blueprint("labs", __name__)


# ---------------------------------------
# DOCKER LAB API
# ---------------------------------------
@labs.route("/api/docker-run", methods=["POST"])
def docker_run():
    data = request.get_json()
    command = data.get("command", "").strip()

    if not command:
        return jsonify({"output": "⚠ Please enter a Docker command"})

    if command == "docker run nginx":
        return jsonify({
            "output": "✅ Container started successfully on port 80"
        })

    elif command == "docker ps":
        return jsonify({
            "output": "📦 nginx container is running"
        })

    return jsonify({
        "output": "❌ Docker command not recognized"
    })


# ---------------------------------------
# KUBERNETES YAML LAB API
# ---------------------------------------
@labs.route("/api/k8s-run", methods=["POST"])
def k8s_run():
    data = request.get_json()
    yaml = data.get("yaml", "").strip()

    if not yaml:
        return jsonify({"output": "⚠ Please enter YAML"})

    if "kind: Pod" in yaml:
        return jsonify({"output": "✅ Pod created successfully"})

    elif "kind: Deployment" in yaml:
        return jsonify({"output": "🚀 Deployment created successfully"})

    return jsonify({"output": "❌ Invalid YAML or unsupported resource"})


# ---------------------------------------
# CI/CD LAB API
# ---------------------------------------
@labs.route("/api/cicd-run", methods=["POST"])
def cicd_run():
    data = request.get_json()
    yaml = data.get("yaml", "").strip()

    if not yaml:
        return jsonify({"output": "⚠ Please enter pipeline YAML"})

    if "jobs:" in yaml and "on:" in yaml:
        return jsonify({"output": "✅ Pipeline validated successfully"})

    return jsonify({"output": "❌ Invalid CI/CD Pipeline YAML"})


# ---------------------------------------
# AI ASSISTANT API
# ---------------------------------------
@labs.route("/api/ask-ai", methods=["POST"])
def ask_ai():
    data = request.get_json()
    question = data.get("question", "").lower().strip()

    if not question:
        return jsonify({"answer": "⚠ Please enter a question"})

    if "what is docker" in question:
        return jsonify({
            "answer": "Docker is a platform used to build, package, and run applications in containers."
        })

    elif "what is kubernetes" in question:
        return jsonify({
            "answer": "Kubernetes is a container orchestration platform for automating deployment, scaling, and management of containers."
        })

    elif "what is pod" in question:
        return jsonify({
            "answer": "A Pod is the smallest deployable unit in Kubernetes."
        })

    elif "what is deployment" in question:
        return jsonify({
            "answer": "A Deployment manages Pods and ensures desired replicas are running."
        })

    elif "what is yaml" in question:
        return jsonify({
            "answer": "YAML is a configuration language commonly used in Kubernetes and CI/CD."
        })

    elif "what is ci/cd" in question or "what is cicd" in question:
        return jsonify({
            "answer": "CI/CD automates software build, test, and deployment pipelines."
        })

    elif "what is jenkins" in question:
        return jsonify({
            "answer": "Jenkins is an open-source automation server for CI/CD."
        })

    elif "what is github actions" in question:
        return jsonify({
            "answer": "GitHub Actions is GitHub's built-in CI/CD automation platform."
        })

    elif "what is linux" in question:
        return jsonify({
            "answer": "Linux is an open-source operating system widely used in servers and DevOps."
        })

    elif "what is devops" in question:
        return jsonify({
            "answer": "DevOps combines software development and IT operations to improve deployment speed and reliability."
        })

    return jsonify({
        "answer": "🤖 I don't know that yet. Try asking about Docker, Kubernetes, YAML, Jenkins, GitHub Actions, Linux, or DevOps."
    })


# ---------------------------------------
# COMPLETE LAB TRACKING API
# ---------------------------------------
@labs.route("/api/complete-lab", methods=["POST"])
def complete_lab():
    data = request.get_json()

    username = data.get("username")
    lab_name = data.get("lab_name")

    if not username or not lab_name:
        return jsonify({
            "message": "Username and Lab Name required"
        }), 400

    existing = LabProgress.query.filter_by(
        username=username,
        lab_name=lab_name
    ).first()

    if not existing:
        progress = LabProgress(
            username=username,
            lab_name=lab_name,
            completed=True
        )

        db.session.add(progress)
        db.session.commit()

    return jsonify({
        "message": "✅ Lab progress saved"
    })