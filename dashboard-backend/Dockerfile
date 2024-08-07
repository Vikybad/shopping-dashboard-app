# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/backend

# Copy package.json and package-lock.json
COPY dashboard-backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY dashboard-backend .

# Expose the port the app runs on
EXPOSE 5000


# Start application
CMD ["npm", "start"]


