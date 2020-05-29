FROM nginx:1.17.1-alpine
COPY ./default.conf /etc/nginx/conf.d/
COPY ./dist/neuroLab /usr/share/nginx/html
