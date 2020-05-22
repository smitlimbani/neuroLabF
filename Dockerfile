FROM node:latest
EXPOSE 8080
RUN mkdir -p/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm build

FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/neuroLab /usr/share/nginx/html
