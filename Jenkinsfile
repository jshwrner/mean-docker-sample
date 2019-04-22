pipeline {
    agent any
    
    environment {
        APP_VERSION="${env.GIT_COMMIT.take(7)}.${currentBuild.number}"
        DOCKER_USER_ID="joshnano"
        APP_NAME="mean-docker_express"
        REPO_NAME="mean_server"
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
                bat "cd express-server && docker tag ${APP_NAME} ${DOCKER_USER_ID}/${REPO_NAME}:${APP_VERSION}"
            }
        }
    }
}
