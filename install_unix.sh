# install docker
sudo snap install docker

# install updates
sudo apt update && sudo apt-get dist-upgrade

# login to Docker
read -p "Docker Username: " username
read -p "Docker Password: " password
sudo echo "$password | docker login --username $username --password-stdin"

# start container
read -p "Application Version: " version
docker run -p 4200:4200 -itd joshnano/angular-simple:"$version"