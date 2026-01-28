#!/bin/bash
# Heroku Deployment Script for Unix/Linux/Mac

set -e

echo ""
echo "========================================"
echo " DEPLOYING TO HEROKU"
echo "========================================"
echo ""

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "Installing Heroku CLI..."
    npm install -g heroku
fi

# Login to Heroku
echo "[1/5] Logging into Heroku..."
heroku login

# Get app name from user
read -p "Enter app name (e.g., moviehub-app): " APP_NAME

echo ""
echo "[2/5] Creating Heroku app..."
heroku create $APP_NAME

echo ""
echo "[3/5] Setting environment variables..."
heroku config:set JWT_SECRET=production-secret-key-2026 --app=$APP_NAME

echo ""
echo "[4/5] Committing changes..."
git add -A
git commit -m "Deploy to Heroku" || true

echo ""
echo "[5/5] Pushing to Heroku..."
git push heroku main

echo ""
echo "========================================"
echo " DEPLOYMENT COMPLETE!"
echo "========================================"
echo ""
echo "Your app is now live at:"
echo "  https://$APP_NAME.herokuapp.com"
echo ""
echo "View logs:"
echo "  heroku logs --tail --app=$APP_NAME"
echo ""
