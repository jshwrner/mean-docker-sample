pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Run Unit Tests') {
            steps {
                echo 'Running angular-client unit tests...'
                echo 'current directory: ' %cd%
                bat 'cd angular-client'
                bat 'npm run test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
