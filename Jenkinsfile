pipeline {
    
    agent any
    
    stages{
        /* stage('Git'){
            when{ expression{ params.Action == 'Build'}}
            steps{
            git 'file:///C:/Users/E5440/Documents/ProyectosVisual/imgShare/.git'
            bat "git checkout ${params.Branch}"
            }
        }  */
   
        stage('Build') {
            when{ expression{ params.Action == 'Build'}}
            steps{
                bat 'docker build -t imgshare .'    
            }
            
        }
   
        stage('Deploy'){
            steps{
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        } 
    }
    post {
        always {
            script {
                wrap([$class: 'BuildUser']) {
                    def user = env.BUILD_USER_ID ? env.BUILD_USER_ID : 'Jenkins'
                    currentBuild.description = "Branch:'$params.Branch'\n User: '$user'"
                }
            }
            deleteDir()
        }
    }
}