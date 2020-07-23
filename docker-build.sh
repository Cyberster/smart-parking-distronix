sudo docker build -t sp-mysql-docker ./schema/
sudo docker build -t sp-node-docker .
sudo docker run --net dockernet --ip 172.18.0.2 -d --name sp-mysql -p 3306:3306 sp-mysql-docker
sudo docker run --net dockernet --ip 172.18.0.3 -d --name sp-node -p 8080:8080 -v $(pwd):/app sp-node-docker
sleep 15
sudo docker start sp-mysql

