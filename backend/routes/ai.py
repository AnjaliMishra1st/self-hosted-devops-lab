from flask import Blueprint, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

ai = Blueprint("ai", __name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@ai.route("/api/ai", methods=["POST"])
def ai_chat():
    data = request.get_json()
    question = data.get("question", "")

    try:
        # 🔥 Try OpenAI first
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a DevOps expert."},
                {"role": "user", "content": question}
            ]
        )

        answer = response.choices[0].message.content

    except Exception as e:
        # 🔥 FREE fallback (no cost)
        q = question.lower()

        if "docker" in q:
            answer = "Docker is a platform that allows you to run applications in containers. It helps in packaging code and dependencies together."
        elif "kubernetes" in q:
            answer = "Kubernetes is a container orchestration tool used to manage and scale applications."
        elif "jenkins" in q:
            answer = "Jenkins is a CI/CD tool used to automate building, testing, and deployment."
        elif "yaml" in q:
            answer = "YAML is a configuration language used in Kubernetes and DevOps tools."
        elif "ci/cd" in q:
            answer = "CI/CD automates code integration, testing, and deployment."
        else:
            answer = "⚠️ AI is currently limited. Add API credits to enable full AI responses."

    return jsonify({"answer": answer})