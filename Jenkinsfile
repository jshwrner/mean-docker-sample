pipeline {
    agent any
    
    stages {
        stage ('checkout'){
          steps{
            checkout scm
          }
        }
        stage('Run Unit Tests') {
            steps {
                echo 'Running angular-client unit tests...'
                bat 'cd angular-client'
                bat 'npm run test'
            }
        }
        stage('Docker Build') {
            steps {
                echo 'Containerizing....'
                bat 'docker-compose up --build'
            }
        }
    }
}
