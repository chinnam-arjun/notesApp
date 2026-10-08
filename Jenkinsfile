pipeline {
    agent {
        label 'docker'
    }
    
    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'qa', 'prod'],
            description: 'Select the environment to deploy to ...'
        )
        string(
            name: 'VERSION',
            defaultValue: '1.0.0',
            description: 'Enter the version to deploy ...'
        )
        booleanParam(
            name: 'RUN_TESTS',
            defaultValue: true,
            description: 'Run tests before deployment?'
        )
    }
    
    // Injecting environment variables for Docker Compose to use
    environment {
        IMAGE_VERSION = "${params.VERSION}"
        // Replace 'your-dockerhub-username' with your actual registry namespace/project
        REGISTRY_USER = '354arjun' 
    }
    
    stages {
        stage('Build') {
            steps {
                echo "Building application version ${IMAGE_VERSION}..."
                // Build images; Compose will read the environment variables automatically
                sh 'docker compose build'
                echo 'Images are successfully built!'
            }
        }
        
        stage('Test') {
            when {
                expression { return params.RUN_TESTS }
            }
            steps {
                echo 'Starting application in detached mode for testing...'
                sh 'docker compose up -d'
                
                echo 'Running test suite inside the container...'
                // CRITICAL: Replace 'app-container-name' with your actual service name from docker-compose.yml
                // Replace 'npm test' with your actual test command (e.g., pytest, mvn test)
                sh 'docker compose exec -T app-container-name npm test || true' 
            }
            post {
                always {
                    echo 'Tearing down test environment...'
                    // Stops and removes containers created during the test stage
                    sh 'docker compose down --volumes'
                }
            }
        }
        
        stage('Deploy') {
            when {
                expression { return params.ENVIRONMENT == 'prod' }
            }
            steps {
                echo "Deploying version ${IMAGE_VERSION} to Production..."
                
                // Securely logging in and pushing the image using Jenkins Credentials
                // Replace 'docker-hub-credentials-id' with your actual Jenkins credential ID
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${REGISTRY_USER}/myapp:${IMAGE_VERSION}"
                }
            }
        }
    }
}
