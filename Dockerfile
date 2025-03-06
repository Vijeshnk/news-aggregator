# Build and serve using Node.js
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files (except those in .dockerignore)
COPY . .

# Build args for environment variables
ARG VITE_NEWS_API_KEY
ARG VITE_GUARDIAN_API_KEY
ARG VITE_NYT_API_KEY

# Set environment variables for build
ENV VITE_NEWS_API_KEY=${VITE_NEWS_API_KEY}
ENV VITE_GUARDIAN_API_KEY=${VITE_GUARDIAN_API_KEY}
ENV VITE_NYT_API_KEY=${VITE_NYT_API_KEY}

# Build the application
RUN npm run build

# Install a simple server to serve static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "dist", "-l", "3000"]