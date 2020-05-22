#FROM node:latest as build
#EXPOSE 8080

#WORKDIR /usr/src/app

#COPY package.json ./

#RUN npm install

#COPY . .

#RUN npm build

FROM nginx:1.17.1-alpine
COPY ./dist/neuroLab /usr/share/nginx/html
