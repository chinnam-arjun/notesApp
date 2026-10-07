pipeline{
    agent none
    stages{
        stage('Build'){
            agent any
            steps{
                echo 'Building...'
            }
        }
        stage('Test'){
            agent any
            steps{
                echo 'Testing...'
            }
        }
        stage('Deploy'){
            agent any
            steps{
                echo 'Deploying...'
            }
        }
    }
}