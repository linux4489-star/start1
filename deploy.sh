#!/bin/bash
# Quick Deploy Script for Multiple Platforms

echo "🚀 Video Streaming App - Deploy Script"
echo "======================================"
echo ""
echo "Choose deployment platform:"
echo "1) Vercel (Recommended - Free)"
echo "2) Render"
echo "3) Railway"
echo "4) Heroku"
echo "5) Local Server"
echo ""
read -p "Enter choice (1-5): " choice

GITHUB_USERNAME=""
APP_NAME="video-streaming-app"

case $choice in
  1)
    echo "=== VERCEL DEPLOYMENT ==="
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    echo ""
    echo "Pushing to GitHub..."
    git remote add origin https://github.com/$GITHUB_USERNAME/$APP_NAME.git
    git branch -M main
    git push -u origin main
    echo ""
    echo "✅ Code pushed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Click 'New Project'"
    echo "3. Import your GitHub repository"
    echo "4. Add JWT_SECRET environment variable"
    echo "5. Click Deploy"
    echo ""
    echo "Your site will be live at: https://$APP_NAME.vercel.app"
    ;;
  
  2)
    echo "=== RENDER DEPLOYMENT ==="
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    echo ""
    echo "Pushing to GitHub..."
    git remote add origin https://github.com/$GITHUB_USERNAME/$APP_NAME.git
    git branch -M main
    git push -u origin main
    echo ""
    echo "Next steps:"
    echo "1. Go to https://render.com"
    echo "2. Click 'New +' → 'Web Service'"
    echo "3. Connect your GitHub repository"
    echo "4. Add JWT_SECRET environment variable"
    echo "5. Deploy"
    ;;
  
  3)
    echo "=== RAILWAY DEPLOYMENT ==="
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    echo ""
    echo "Pushing to GitHub..."
    git remote add origin https://github.com/$GITHUB_USERNAME/$APP_NAME.git
    git branch -M main
    git push -u origin main
    echo ""
    echo "Next steps:"
    echo "1. Go to https://railway.app"
    echo "2. Click 'Start Project'"
    echo "3. Select 'Deploy from GitHub'"
    echo "4. Choose your repository"
    echo "5. Add JWT_SECRET environment variable"
    ;;
  
  4)
    echo "=== HEROKU DEPLOYMENT ==="
    echo "Installing Heroku CLI..."
    npm install -g heroku
    echo ""
    echo "Logging in to Heroku..."
    heroku login
    echo ""
    read -p "Enter app name: " APP_NAME
    echo ""
    echo "Creating Heroku app..."
    heroku create $APP_NAME
    echo ""
    echo "Setting environment variables..."
    read -p "Enter JWT_SECRET: " JWT_SECRET
    heroku config:set JWT_SECRET=$JWT_SECRET
    echo ""
    echo "Deploying..."
    git push heroku main
    echo ""
    echo "✅ Deployed to: https://$APP_NAME.herokuapp.com"
    ;;
  
  5)
    echo "=== LOCAL SERVER ==="
    echo "Installing dependencies..."
    npm install
    echo ""
    echo "Starting server..."
    npm start
    echo ""
    echo "✅ Server running at: http://localhost:3000"
    ;;
  
  *)
    echo "Invalid choice"
    exit 1
    ;;
esac
