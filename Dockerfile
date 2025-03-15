# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package*.json files to the working directory
COPY package.json ./
COPY index.js ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port 3001 to the host, so we can access it from the outside
EXPOSE 3001

# Run command to start the server when the container launches
CMD ["node", "/app/index.js"]
