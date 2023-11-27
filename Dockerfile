# frontend/Dockerfile

# We are using the Node image as our base image.
FROM node:16 AS build

# Set the working directory inside the container.
WORKDIR /app

# Copy the `package.json` and `package-lock.json` to the working directory.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the code into the container.
COPY . ./

# Build the React app.
RUN npm run build

### Stage 2 - Serve using Nginx ###

FROM nginx:alpine

# Copy the build folder from React in the previous stage into the container.
COPY --from=build /app/build/ /usr/share/nginx/html

# Set the command to run when the image is used as a container.
CMD ["nginx", "-g", "daemon off;"]
