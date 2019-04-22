pipeline {
    agent any

    environment {
        APP_VERSION = "${env.GIT_COMMIT.take(7)}.${currentBuild.number}"
        APP_NAME = "mean-docker_express"
        REPO_NAME = "mean_server"
    }
    stages {
        stage('Initialization'){
            steps{
                node{                
                    withCredentials([usernamePassword(credentialsId: 'f238a476-2f22-450c-bfc2-2526789805b5', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER_ID')]) {
                        echo "$DOCKER_USER_ID" 
                        echo "$DOCKER_PASSWORD"
                    }    
                }
            }
        }
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
        stage('Pushing Server') {
            steps {
                echo 'Tagging and Pushing....'
                bat "${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER_ID} -p --password-stdin"
                bat "cd express-server && docker tag ${APP_NAME} ${DOCKER_USER_ID}/${REPO_NAME}:${APP_VERSION}"
                bat "docker push ${DOCKER_USER_ID}/${REPO_NAME}:${APP_VERSION}"
                echo 'Image Pushed Successfully'
            }
        }
    }
}
