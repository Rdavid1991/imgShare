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

        stage('StartStop') {
            when{ expression{ params.Action == 'Start' || params.Action == 'Stop'}}
            steps{
                script{
                    if(params.Action == 'Start'){
                        bat 'docker-compose start' 
                    }else{
                        bat 'docker-compose stop'
                    }
                }
            }
        }

        stage('Deploy'){
            when{ expression{ params.Action == 'Build' || params.Action == 'Up' || params.Action == 'Down' || params.Action == 'Prune'}}
            steps{
                script{
                    if(params.Action == 'Build'){
                        bat 'docker-compose down'
                        bat 'docker-compose up -d'
                    }else if(params.Action == 'Up'){
                        bat 'docker-compose up -d'
                    }else if(params.Action == 'Down'){
                        bat 'docker-compose down'
                    }else if(params.Action == 'Prune'){
                        bat 'docker system prune -f'
                        bat 'docker volume prune -f'
                    }
                }
            }
        } 
    }
    post {
        always {
            script {
                wrap([$class: 'BuildUser']) {
                    def user = env.BUILD_USER_ID ? env.BUILD_USER_ID : 'Jenkins'
                    currentBuild.description = "Branch:'$params.Branch'\n User: '$user' \n Action: '$params.Action''"
                }
            }
            deleteDir()
        }
    }
}