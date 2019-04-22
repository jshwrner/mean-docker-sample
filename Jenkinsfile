pipeline {
    agent any
    
    environment {
        APP_VERSION="${env.GIT_COMMIT.take(7)}.${currentBuild.number}"
        DOCKER_ID_USER="joshnano"
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
                docker tag "${DOCKER_ID_User}/mean_server":"${APP_VERSION}" reponame:"${APP_VERSION}"
            }
        }
    }
}
