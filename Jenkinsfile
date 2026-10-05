pipelie{
    agent none
    options {
        skipDefaultCheckout(),
        parallelAlwaysFailFast(true),
        
    }
    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build'),
        options(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Deployment environment'),
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run tests after build'),
    }
    environment {
        DOCKER_IMAGE = "myapp:${params.BRANCH_NAME}"
    }
    stages{
        stage('CHECKOUT'){
            agent any
            steps{
                checkout scm
            }
        }
        stage('BUILD, TEST, AND DEPLOY'){
            parallel{
                stage('BUILD'){
                    agent any
                    steps{
                        sh 'docker build -t ${DOCKER_IMAGE} .'
                    }
                }
                stage('TEST'){
                    agent any
                    when {
                        expression { return params.RUN_TESTS }
                    }
                    steps{
                        sh 'docker run --rm ${DOCKER_IMAGE} npm test'
                    }
                }
                stage('DEPLOY'){
                    agent any
                    when {
                        expression { return params.ENVIRONMENT == 'prod' }
                    }
                    steps{
                        sh 'docker push ${DOCKER_IMAGE}'
                        //sh 'kubectl apply -f k8s/deployment.yaml'
                    }
                }
            }
        }
    }

}