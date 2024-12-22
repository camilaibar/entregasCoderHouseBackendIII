FROM node:23.5.0

# Set working directory
WORKDIR /app

# Copy only package files first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port
EXPOSE 8080

# Command to start the application
CMD ["npm", "start"]
