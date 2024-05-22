# Use the official Node.js  LTS image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR .

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Node.js application will run
EXPOSE 3000

# Define environment variables (e.g., database connection details)
ENV POSTGRES_HOST=postgres \
    POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=postgres \
    POSTGRES_DB=desafio \
    REDIS_HOST=redis

# Build the Nest.js application
RUN npm run build

# Start the Nest.js application
CMD ["node", "dist/main.js"]
