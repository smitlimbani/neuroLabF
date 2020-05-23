pipeline {
  environment {
    registry = "smitlimbani/neurolabf"
    registryCredential = 'db-new-cred'
    dockerImage = ''
    dockerImageLatest = ''
  }
  tools {
      nodejs "npm"
  }
  agent any
  stages {
    stage('Cloning Git Frontend') {
      steps {
        git 'https://github.com/smitlimbani/neuroLabF.git'
      }
    }
    stage('NPM Build'){
        steps {
             sh 'npm install'
             sh 'npm run build'
        }
    }
    stage('Building image') {
       steps{
         script {
           dockerImage = docker.build registry + ":$BUILD_NUMBER"
           dockerImageLatest = docker.build registry + ":latest"
         }
       }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
            dockerImageLatest.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
    stage('Execute Rundeck job') {
        steps {
          script {
            step([$class: "RundeckNotifier",
                  includeRundeckLogs: true,
                  jobId: "95adbd24-8d6e-44b5-a655-116c279ec270",
                  rundeckInstance: "Rundeck",
                  shouldFailTheBuild: true,
                  shouldWaitForRundeckJob: true,
                  tailLog: true])
          }
        }
    }
  }
}
