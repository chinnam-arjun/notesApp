# Stage 1: Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy backend source code
COPY . .

# Application port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]