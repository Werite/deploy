FROM ubuntu:18.04
FROM node:latest

RUN apt-get update && apt-get install -y \
    software-properties-common
    
RUN apt-get update && apt-get install -y \
    python3\
    python3-pip


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 5000
EXPOSE 8080

CMD ["node","server.js"]