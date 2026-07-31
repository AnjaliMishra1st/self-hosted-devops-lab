from flask import Blueprint, jsonify, request
from models.progress import LabProgress

dashboard = Blueprint("dashboard", __name__)


# ---------------------------------------
# USER DASHBOARD STATS API
# ---------------------------------------
@dashboard.route("/api/dashboard-stats", methods=["GET"])
def dashboard_stats():
    username = request.args.get("username")

    user_progress = LabProgress.query.filter_by(username=username).all()

    completed_labs = len(user_progress)

    total_labs = 5
    progress_percent = int((completed_labs / total_labs) * 100)

    return jsonify({
        "active_labs": completed_labs,
        "progress": progress_percent,
        "ai_usage": 0,
        "yaml_runs": completed_labs
    })


# ---------------------------------------
# TEACHER / ADMIN STUDENT PROGRESS API
# ---------------------------------------
@dashboard.route("/api/admin/student-progress", methods=["GET"])
def student_progress():
    all_progress = LabProgress.query.all()

    data = []

    for progress in all_progress:
        data.append({
            "username": progress.username,
            "lab_name": progress.lab_name,
            "completed": progress.completed
        })

    return jsonify(data)