#!/bin/sh

# build the docker
sudo docker build -t scraper . 

# start the container, expose to network and remove after running
sudo docker run --network=host --rm -it scraper