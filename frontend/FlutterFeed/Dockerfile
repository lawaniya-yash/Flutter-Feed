
# Use the official image as a parent image
FROM node:18.9.1

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker's caching mechanism
COPY package*.json ./


# Run the command inside your image filesystem
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime
EXPOSE 5173

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# Run the specified command within the container
CMD ["npm" , "run" , "start"]