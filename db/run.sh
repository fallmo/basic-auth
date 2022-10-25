#!/bin/bash
container_name="basic_auth_db"

start () {
    docker start $container_name
}

create (){
    mkdir -p $(pwd)/volume && chmod 777 $(pwd)/volume
    docker run -d --name $container_name -p 27017:27017 -v "$(pwd)"/volume:/data/db:Z mongo
}

if start 
then 
    echo "restarted"
    docker logs -f $container_name
elif create
then
    echo "created"
    docker logs -f $container_name
fi