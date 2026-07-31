from flask import Blueprint, request, jsonify
import subprocess

docker = Blueprint("docker", __name__)

@docker.route("/api/docker-run", methods=["POST"])
def run_docker():
    data = request.get_json()
    command = data.get("command")

    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True
        )

        output = result.stdout + result.stderr

        if not output.strip():
            output = "✅ Command executed successfully (no output)"

        return jsonify({"output": output})

    except Exception as e:
        return jsonify({"output": f"❌ Error: {str(e)}"})