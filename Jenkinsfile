pipeline {
    agent any

    triggers {
        github(branch: ['main', 'master'])
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out the repository
                checkout scm
            }
        }

        stage('Test') {
            agent {
                label 'ubuntu-latest'
            }
            options {
                timeout(time: 60, unit: 'MINUTES')
            }
            steps {
                script {
                    // Set up Node.js and npm
                    node {
                        stage('Install Node.js and npm') {
                            tool 'NodeJS 18'
                            sh 'npm ci'
                        }
                    }
                }

                // Install Playwright and browsers
                stage('Install Playwright Browsers') {
                    sh 'npx playwright install --with-deps'
                }

                // Run Playwright tests
                stage('Run Playwright tests') {
                    sh 'npx playwright test --reporter=html'
                }

                // Upload test report as artifact
                stage('Upload Test Report') {
                    archiveArtifacts artifacts: 'playwright-report/*.html', allowEmptyArchive: true
                }

                // Upload to S3
                stage('Upload to S3') {
                    steps {
                        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'your-aws-credentials-id', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                            sh 'aws s3 cp playwright-report/ s3://store-test-results/ --recursive'
                        }
                    }
                }

                // Link to report
                stage('Link To Report') {
                    steps {
                        script {
                            def objectKey = sh(script: 'echo ${S3_OBJECT_KEY}', returnStdout: true).trim()
                            echo "https://store-test-results.s3.amazonaws.com/${objectKey}/index.html"
                        }
                    }
                }
            }
        }
    }
}
