🚀 Project Overview
---
This project is a self-hosted, offline DevOps lab created to simulate real-world CI/CD workflows without relying on cloud platforms like AWS or GCP.
It includes:

✔ Jenkins Pipeline (automated builds)

✔ Docker image build inside Jenkins container using Docker-in-Docker

✔ Kubernetes (kind cluster) for local deployment

✔ GitHub Actions for optional cloud CI

✔ Complete DevOps toolchain on your own machine

This setup is ideal for learning, experimenting, and showcasing DevOps skills in interviews.

---

🧱 Architecture Diagram
---
Developer → GitHub Repo → Jenkins Pipeline → Docker Build → KIND Kubernetes Cluster

---

🔧 Tech Stack
| Component        | Technology                |
| ---------------- | ------------------------- |
| CI/CD Engine     | Jenkins (Dockerized)      |
| SCM              | Git + GitHub              |
| Containerization | Docker                    |
| Deployment       | Kubernetes (kind cluster) |
| App Framework    | Flask (Python)            |

---

⚙️ Features
---
🎯 1. Automated CI Pipeline with Jenkins

Pulls code from GitHub

Builds Docker image

Push-ready to Docker Hub

Can deploy to Kubernetes cluster

🐳 2. Docker Inside Jenkins
---
Jenkins container includes Docker CLI, allowing:

docker build

docker run

docker ps

Passing artifacts to Kubernetes
---
☸️ 3. Kubernetes Deployment Ready

K8s manifests include:

Deployment

Service

RBAC

Metrics
---
🤖 4. Extensible GitHub Actions Workflow

Runs lint, build, or test workflows in cloud.

---

📁 Repository Structure
---
├── app.py
├── Dockerfile
├── Jenkinsfile
├── requirements.txt
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── rbac.yaml
├── static/
├── templates/
└── .github/workflows/ci.yml

---

🛠️ How Jenkins Pipeline Works
---
✔ Stage 1 — Checkout

Pulls latest code from GitHub.

✔ Stage 2 — Build Docker Image

Builds local image:

```
docker build -t anjalimishra/flask-devops-lab:latest .
```

✔ Stage 3 — Optional Deploy

Deploys to kind Kubernetes cluster:

```
kubectl apply -f k8s/
```

---

▶️ Running This Project
---
1️⃣ Start Jenkins container
```
docker run -d \
  --name jenkins \
  --user root \
  -p 9090:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

2️⃣ Install Plugins
---
Required:

Docker Pipeline

GitHub Integration

Kubernetes CLI

Credentials Binding

3️⃣ Create Pipeline Job
---
Use:
```
https://github.com/AnjaliMishra1st/self-hosted-devops-lab.git
```

Jenkins auto-detects Jenkinsfile.

---

🏆 Why This Project Matters

✔ Demonstrates real DevOps CI/CD skills

✔ Works fully offline — perfect for low-resource environments

✔ Recruiters love end-to-end pipelines

✔ Shows understanding of Git, Docker, Kubernetes, GitHub Actions, and Jenkins

---

📜 License

MIT License — free to use and modify.

---
👩‍💻 Author
---
Anjali Mishra
3rd Year B.Tech Student • DevOps & Cloud Learner

