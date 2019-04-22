pipeline {
    agent any

    environment {
        APP_VERSION = "${env.GIT_COMMIT.take(7)}.${currentBuild.number}"
        APP_NAME = "mean-docker_express"
        REPO_NAME = "joshnano/mean_server"
    }
    stages {
        stage('Install Dependencies'){
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
        stage('Login to Docker'){
            steps{              
                withCredentials([usernamePassword(credentialsId: 'f238a476-2f22-450c-bfc2-2526789805b5', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER_ID')]) {
                    DOCKER_USER_ID = 
                    bat "docker login -u ${DOCKER_USER_ID} -p ${DOCKER_PASSWORD}"
                }   
            }
        }
        stage('Pushing Server') {
            steps {
                echo 'Tagging and Pushing....'
                bat "cd express-server && docker tag ${APP_NAME} ${REPO_NAME}:${APP_VERSION}"
                bat "docker push ${REPO_NAME}:${APP_VERSION}"
                echo 'Image Pushed Successfully'
            }
        }
    }
}
