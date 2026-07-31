from flask import Blueprint, request, jsonify
from models.db import db
from models.progress import LabProgress

progress = Blueprint("progress", __name__)

# SAVE PROGRESS
@progress.route("/api/progress", methods=["POST"])
def save_progress():
    data = request.get_json()

    username = data.get("username")
    lab_name = data.get("lab_name")

    if not username or not lab_name:
        return jsonify({"message": "Missing data"}), 400

    entry = LabProgress(
        username=username,
        lab_name=lab_name,
        completed=True
    )

    db.session.add(entry)
    db.session.commit()

    return jsonify({"message": "Progress saved"})


# GET PROGRESS
@progress.route("/api/progress/<username>", methods=["GET"])
def get_progress(username):
    data = LabProgress.query.filter_by(username=username).all()

    return jsonify({
        "completed": len(data)
    })