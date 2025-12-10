
pipeline {
  agent any

  environment {
    IMAGE_NAME = "anjalimishra/flask-devops-lab"
    IMAGE_TAG  = "latest"
  }

  stages {

    stage('Build Docker image') {
      steps {
        echo "Building image ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
        sh "docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} ."
      }
    }

    // Disable kind deploy for now — we enable after image build success
    stage('Deploy to k8s (kind/local)') {
      when { expression { false } }  // temporarily skip this stage
      steps {
        echo "Skipping deploy until Docker build works"
      }
    }
  }

  post {
    success { echo "Pipeline finished SUCCESS" }
    failure { echo "Pipeline finished FAILURE" }
  }
}
