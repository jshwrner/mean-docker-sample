pipeline {
    agent any
    
    environment {
        APP_VERSION = "${env.GIT_COMMIT.take(7)}.${currentBuild.number}"
    }
    
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
                bat 'cd angular-client && ng test --code-coverage --no-watch --source-map=false'
            }
        }
        stage('Containerize') {
            steps {
                echo 'Containerizing....'
                docker tag joshnano/mean-docker-server:"${APP_VERSION}" reponame:"${APP_VERSION}"
                docker push joshnano/mean-docker-server
            }
        }
    }
}
