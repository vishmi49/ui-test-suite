pipeline {
  agent any
  tools {nodejs 'Node22'}
  
  environment {
       CHROME_BIN = '/bin/google-chrome'
      
   }

  stages {

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Cypress Tests in Chrome') {
      steps {
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
          sh 'npm run test:ci'
        }
      }
    }

    stage('Merge Mochawesome Reports') {
      steps {
        sh '''
          mkdir -p cypress/results
          npx mochawesome-merge cypress/results/*.json > cypress/results/merged-reports.json || echo "No reports to merge"
        '''
      }
    }

    stage('Generate HTML Report') {
      steps {
        sh 'npx mochawesome-report-generator cypress/results/merged-reports.json --reportDir cypress/results --reportFilename test-report.html'
      }
    }

    stage('Archive Test Report') {
      steps {
        archiveArtifacts artifacts: 'cypress/results/**', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}

