FROM node:latest

MAINTAINER 

ENV NODE_ENV=development
ENV PORT=8080

COPY . /var/www

WORKDIR /var/www
VOLUME ["/var/www"]

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]