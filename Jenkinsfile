pipeline {
    agent any
    
    stages {
        stage ('Install Dependencies'){
          steps{
            bat 'set > env.txt' 
            for (String i : readFile('env.txt').split("\r?\n")) {
                 println i
            }
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
                bat 'docker tag local-image:0.0. reponame:APP_VERSION'
                bat 'docker-compose push joshnano/mean-docker:APP_VERSION'
            }
        }
    }
}
