from flask import Blueprint, request, jsonify
from models.user import User
from models.db import db

auth = Blueprint('auth', __name__)

# ---------------------------
# SIGNUP API
# ---------------------------
@auth.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "student")

    # Validation
    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    # Check existing user
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    # Create new user
    user = User(
        username=username,
        role=role
    )

    # 🔐 HASH PASSWORD (IMPORTANT)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Signup successful"}), 200


# ---------------------------
# LOGIN API
# ---------------------------
@auth.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Missing credentials"}), 400

    user = User.query.filter_by(username=username).first()

    # ❌ If user not found OR password wrong
    if user is None or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    # ✅ Success
    return jsonify({
        "username": user.username,
        "role": user.role
    }), 200


# ---------------------------
# LOGOUT API
# ---------------------------
@auth.route("/api/logout", methods=["GET"])
def logout():
    return jsonify({"message": "Logged out"}), 200