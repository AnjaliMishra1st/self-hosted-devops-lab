from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables (.env)
load_dotenv()

from routes.auth import auth
from routes.dashboard import dashboard
from routes.labs import labs
from routes.progress import progress
from routes.docker import docker
from routes.ai import ai   # ✅ NEW

from models.db import db
from models.user import User
from models.progress import LabProgress

app = Flask(__name__)

# Secret key
app.secret_key = "devops-lab-super-secret"

# Enable CORS
CORS(app)

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init DB
db.init_app(app)

# Register routes
app.register_blueprint(auth)
app.register_blueprint(dashboard)
app.register_blueprint(labs)
app.register_blueprint(progress)
app.register_blueprint(docker)
app.register_blueprint(ai)   # ✅ IMPORTANT

# Health check
@app.route("/healthz")
def health():
    return {"status": "ok"}

# Root
@app.route("/")
def home():
    return {"message": "DevOpsVerse Backend Running"}

# Run server
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    print("🔑 API KEY LOADED:", bool(os.getenv("OPENAI_API_KEY")))  # Debug check

    app.run(debug=True)