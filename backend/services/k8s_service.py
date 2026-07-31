import logging
from kubernetes import client, config

# 
logging.getLogger("urllib3").setLevel(logging.CRITICAL)
logging.getLogger("kubernetes").setLevel(logging.CRITICAL)


# -----------------------------------
# GET KUBERNETES CLIENT (FIXED)
# -----------------------------------
def get_k8s_client():
    try:
        config.load_incluster_config()
    except:
        try:
            config.load_kube_config()
        except:
            return None

    return client.CoreV1Api()


# -----------------------------------
# FETCH PODS + SERVICES
# -----------------------------------
def get_k8s_state():
    api = get_k8s_client()

    if api is None:
        return None, None

    try:
        pods_data = api.list_pod_for_all_namespaces()
        services_data = api.list_service_for_all_namespaces()

        pods = [
            {
                "name": p.metadata.name,
                "phase": p.status.phase
            }
            for p in pods_data.items
        ]

        services = [
            {
                "name": s.metadata.name,
                "type": s.spec.type
            }
            for s in services_data.items
        ]

        return pods, services

    except:
        # 🔥 REMOVE noisy error printing
        return None, None


# -----------------------------------
# AI INSIGHTS
# -----------------------------------
def generate_ai_insights(pods):
    insights = []

    if pods:
        unhealthy = [p for p in pods if p["phase"] != "Running"]

        if unhealthy:
            insights.append({
                "level": "warning",
                "message": "Some pods are not in Running state."
            })

    return insights