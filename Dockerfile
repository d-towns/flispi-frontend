# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development
ENV CHOKIDAR_USEPOLLING true


# Setting up the work directory
WORKDIR /home/react/app

# Installing dependencies
COPY ./package*.json /home/react/app

RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm","start"]