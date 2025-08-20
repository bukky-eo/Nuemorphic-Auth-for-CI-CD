pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/bukky-eo/neumorphic-auth-for-ci-cd-'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    
    // post {
    //     always {
    //         junit '**/test-results/*.xml'
    //         archiveArtifacts artifacts: 'cypress/videos/**/*, playwright-report/**/*', allowEmptyArchive: true
    //     }
    // }
}
