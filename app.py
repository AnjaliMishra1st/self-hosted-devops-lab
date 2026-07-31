from flask import Blueprint, request, redirect, session, url_for, render_template
from models.user import User
from models.db import db

auth = Blueprint('auth', __name__)

# ---------------------------
# LOGIN
# ---------------------------
@auth.route("/login", methods=["GET", "POST"])
def login_page():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # 🔥 Check from database
        user = User.query.filter_by(username=username, password=password).first()

        if user:
            session["user"] = username
            return redirect(url_for("dashboard.dashboard_page"))

    return render_template("login.html")


# ---------------------------
# SIGNUP
# ---------------------------
@auth.route("/signup", methods=["GET", "POST"])
def signup_page():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # 🔥 Save new user
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for("auth.login_page"))

    return render_template("signup.html") 