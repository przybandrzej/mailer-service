# Node runtime version
FROM node:12.18.3-alpine3.9

# The api directory insede of the docker image
RUN mkdir -p /usr/src/api/
WORKDIR /usr/src/api/

# A wildcard is used to ensure both package.json AND package-lock.json are copied to the docker image

COPY package*.json /usr/src/api/

# Copy the project to the docker image

COPY . /usr/src/api/

# Install the API dependencies with NPM

RUN npm install

# Informe to the docker, the door let's use

EXPOSE 3000
# SSL SMTP port
EXPOSE 465

CMD ["npm", "start"]
