FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY api ./api
COPY public ./public

# Create uploads directory
RUN mkdir -p /tmp/uploads/videos

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "api/index.js"]
