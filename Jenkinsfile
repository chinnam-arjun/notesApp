pipeline{
    agent {
        label 'docker'
    }
    parameters{
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'qa', 'prod'],
            description: 'Select the environment to deploy to ...'
        ),
        string(
            name: 'VERSION',
            defaultValue: '1.0.0',
            description: 'Enter the version to deploy ...'
        ),
        booleanParam(
            name: 'RUN_TESTS',
            defaultValue: true,
            description: 'Run tests before deployment?'
        )

    }
    
    stages{
        stage('Build'){
            steps{
                echo 'Building...'
                sh 'docker compose build'
                echo 'images are built!'
            }
        }
        stage('Test'){
            when{
                expression { return params.RUN_TESTS  }
                
            }
            steps{
                echo 'starting appication...'
                sh 'docker compose up -d'
                echo 'running tests...'
                
            }
        }
        stage('Deploy'){
            when{
                expression { return params.ENVIRONMENT == 'prod' }
            }
            steps{
                echo 'Deploying to production...'
                sh 'docker push myapp:${params.VERSION}'
            }
        }
    }
}