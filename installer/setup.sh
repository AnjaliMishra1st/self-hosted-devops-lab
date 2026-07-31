#!/bin/bash

# ----------------------------
# Step 1 — Check Docker
# ----------------------------
if ! command -v docker &> /dev/null
then
    echo "❌ Docker not found. Install Docker first."
    exit 1
fi

if ! docker info &> /dev/null
then
    echo "❌ Docker is not running. Start Docker Desktop."
    exit 1
fi

echo "✅ Docker running."

# ----------------------------
# Step 2 — Check kind
# ----------------------------
if ! command -v kind &> /dev/null
then
    echo "❌ kind not found. Install kind first."
    exit 1
fi

echo "✅ kind found."

# ----------------------------
# Step 3 — Ensure cluster exists
# ----------------------------
echo "🔧 Ensuring kind cluster exists..."

if kind get clusters | grep -q "devops-platform"; then
    echo "✅ kind cluster already exists."
else
    echo "🚀 Creating kind cluster..."
    kind create cluster --name devops-platform
fi

# ----------------------------
# ----------------------------
echo "📦 Applying Kubernetes manifests..."

if [ -d "k8s" ]; then
    kubectl apply -f k8s/
else 
   echo "⚠ k8s folder not found."
fi

# ----------------------------
# ----------------------------
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# ----------------------------
# Step 6 — Start Flask App
# ----------------------------
echo "🧠 Starting Control Plane..."
gunicorn -w 4 -b 0.0.0.0:5000 app:app &
sleep 3

echo "--------------------------------------------"
echo "🎉 DevOps Platform Ready!"
echo "Dashboard: http://localhost:5000"
echo "--------------------------------------------"
