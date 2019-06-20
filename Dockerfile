#Specifies the base image we're extending
FROM node:10-alpine

# Specify the "working directory" for the rest of the Dockerfile
WORKDIR /app

# Install packages using NPM 5 (bundled with the node:9 image)
COPY ./package.json /app/package.json
#COPY ./package-lock.json /app/package-lock.json
RUN npm install --silent
  COPY . /app
# Add application code
##COPY ./index /src/index
#COPY ./bin /src/bin
##COPY ./controllers /src/controllers
##COPY ./routers /src/routers
##COPY ./services /src/services
##COPY ./utils /src/utils

# Add the nodemon configuration file
##COPY ./nodemon.json /src/nodemon.json

# Set environment to "development" by default
##ENV NODE_ENV development

# Allows port 3000 to be publicly available
EXPOSE 8080

# The command uses nodemon to run the application
CMD [ "npm", "start" ]
#CMD ["node", "node_modules/.bin/nodemon", "-L", "bin/www"]

