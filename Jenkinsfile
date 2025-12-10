pipeline {
  agent any

  environment {
    IMAGE_NAME = "anjalimishra/flask-devops-lab"
    IMAGE_TAG  = "latest"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[url: 'https://github.com/AnjaliMishra1st/self-hosted-devops-lab.git']]])
      }
    }

    stage('Build Docker image') {
      steps {
        echo "Building image ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
        sh "docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} ."
      }
    }

    stage('Deploy to k8s (kind/local)') {
      steps {
        echo "Loading image into kind and deploying"
        sh "kind load docker-image ${env.IMAGE_NAME}:${env.IMAGE_TAG} --name flask-devops-lab || true"
        sh "kubectl apply -f k8s/"
        sh "kubectl rollout status deployment/flask-devops-lab --timeout=120s"
      }
    }
  }

  post {
    success { echo "Pipeline finished SUCCESS" }
    failure { echo "Pipeline finished FAILURE" }
  }
}
