#!/bin/bash

# One-Click Production Deployment for Linux/Mac
# Run: chmod +x deploy_production.sh && ./deploy_production.sh

set -e

echo ""
echo "========================================"
echo " MOVIEHUB - PRODUCTION DEPLOYMENT"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed"
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

# Build and start containers
echo "[1/4] Building Docker image..."
docker-compose build --no-cache

echo ""
echo "[2/4] Starting application..."
docker-compose up -d

echo ""
echo "[3/4] Waiting for application to start..."
sleep 3

# Check if app is running
if ! docker ps | grep -q "moviehub\|video-streaming"; then
    echo "ERROR: Application failed to start"
    docker-compose logs
    exit 1
fi

echo ""
echo "[4/4] Application started successfully!"
echo ""
echo "========================================"
echo " DEPLOYMENT COMPLETE"
echo "========================================"
echo ""
echo "Your application is now live at:"
echo "  http://localhost:3000"
echo ""
echo "Default Login Credentials:"
echo "  Email: owner@moviehub.com"
echo "  Password: linux@5566"
echo ""
echo "Useful Commands:"
echo "  Stop app:     docker-compose down"
echo "  View logs:    docker-compose logs -f"
echo "  Rebuild:      docker-compose build --no-cache"
echo ""
echo "Deploy to Cloud:"
echo "  1. Install CLI for your platform (heroku, railway, etc)"
echo "  2. Authenticate: heroku login (for Heroku)"
echo "  3. Deploy: git push heroku main"
echo ""
