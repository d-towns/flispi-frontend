# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /home/node/app

# Installing dependencies
COPY ./package*.json /home/node/app

RUN npm install
RUN npm install react-scripts@5.0.1 -g  

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm","start"]