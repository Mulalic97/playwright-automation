pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.42.1-jammy'
        }
    }

    triggers {
        githubPush(branch: ['main', 'master'])
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out the repository
                checkout scm
            }
        }

        stage('Test') {
            options {
                timeout(time: 60, unit: 'MINUTES')
            }
            steps {
                // Set up Node.js and npm
                tool 'NodeJS 18'
                sh 'npm ci'

                // Install Playwright and browsers
                sh 'npx playwright install --with-deps'

                // Run Playwright tests
                sh 'npx playwright test --reporter=html'

                // Upload test report as artifact
                archiveArtifacts artifacts: 'playwright-report/*.html', allowEmptyArchive: true

                // Upload to S3
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'your-aws-credentials-id', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh 'aws s3 cp playwright-report/ s3://store-test-results/ --recursive'
                }

                // Link to report
                script {
                    def objectKey = sh(script: 'echo ${S3_OBJECT_KEY}', returnStdout: true).trim()
                    echo "https://store-test-results.s3.amazonaws.com/${objectKey}/index.html"
                }
            }
        }
    }
}
