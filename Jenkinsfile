pipeline {
    agent {
        docker {
            image 'node:20' // Use a versão do Node.js que você precisa
        }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'apt-get update && apt-get install -y npm'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}