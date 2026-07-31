from .db import db

class LabProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    lab_name = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=True)