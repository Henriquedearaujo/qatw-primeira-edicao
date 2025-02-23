pipeline {
    agent {
        docker {
            image 'node:20.10.0' // Use a versão do Node.js que você precisa
        }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}