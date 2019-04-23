pipeline {
    agent any

    environment {
        APP_VERSION = "1.0.${currentBuild.number}"
        APP_NAME = "mean-docker_angular-simple"
        REPO_NAME = "joshnano/angular-simple"
    } 

    stages {
        stage('Install Dependencies'){
          steps{
            bat 'cd angular-simple && npm i'
            bat 'cd angular-client && npm i'
            bat 'cd express-server && npm i'
          }
        }        
        stage('Run Linter') {
            steps {
                echo 'Running angular-simple tslint...'
                bat 'cd angular-simple && ng lint'
            }
        }
        stage('Run Unit Tests') {
            steps {
                echo 'Running angular-simple unit tests...'
                bat 'cd angular-simple && ng test --code-coverage --no-watch --source-map=false'
            }
        }
        stage('Login to Docker'){
            steps{              
                withCredentials([usernamePassword(credentialsId: 'f238a476-2f22-450c-bfc2-2526789805b5', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER_ID')]) {
                    echo "${DOCKER_PASSWORD} | docker login --username ${DOCKER_USER_ID} --password-stdin"
                }   
            }
        }
        stage('Pushing Simple Client') {
            steps {
                echo 'Tagging and Pushing....'
                bat "cd angular-simple && docker build -t ${APP_NAME} ."
                bat "cd angular-simple && docker tag ${APP_NAME} ${REPO_NAME}:${APP_VERSION}"
                bat "docker push ${REPO_NAME}:${APP_VERSION}"
                echo 'Image Pushed Successfully'
            }
        }
        // stage('Pushing Server') {
        //     steps {
        //         echo 'Tagging and Pushing....'
        //         bat "cd express-server && docker build -t ${APP_NAME} ."
        //         bat "cd express-server && docker tag ${APP_NAME} ${REPO_NAME}:${APP_VERSION}"
        //         bat "docker push ${REPO_NAME}:${APP_VERSION}"
        //         echo 'Image Pushed Successfully'
        //     }
        // }
    }
}
