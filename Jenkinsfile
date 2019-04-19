pipeline {
    agent any
    
    stages {
        stage ('checkout'){
          steps{
            checkout scm
          }
        }
        stage ('install dependencies'){
          steps{
            bat 'cd angular-client && npm i'
          }
        }
        stage('run unit tests') {
            steps {
                echo 'Running angular-client unit tests...'
                bat 'cd angular-client && npm run test'
            }
        }
        stage('containerize') {
            steps {
                echo 'Containerizing....'
                bat 'docker-compose up --build'
            }
        }
    }
}
