pipeline {
    agent any
    
    stages {
        stage ('Install Dependencies'){
          steps{
            bat 'cd angular-client && npm i'
            bat 'cd express-server && npm i'
          }
        }
        stage('Run Unit Tests') {
            steps {
                echo 'Running angular-client unit tests...'
                bat 'cd angular-client && npm run test --watch false'
            }
        }
        stage('Containerize') {
            steps {
                echo 'Containerizing....'
                bat 'docker-compose up --build'
                bat 'docker tag local-image:BUILD_TAG'
                bat 'docker push joshnano/mean-docker:BUILD_TAG'
            }
        }
    }
}
