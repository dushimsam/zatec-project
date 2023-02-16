FROM node:14.5.0-alpine as builder

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

COPY package.json /app/

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port 3000 for web traffic
EXPOSE 3000

# Start the application
CMD ["npm", "start"]