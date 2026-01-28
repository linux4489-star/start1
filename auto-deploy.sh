#!/bin/bash
# AUTOMATED DEPLOYMENT SCRIPT - Creates GitHub repo and deploys to Vercel

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║          VIDEO STREAMING APP - AUTOMATED DEPLOY          ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI not found. Installing..."
    echo ""
    echo "Option A: Install GitHub CLI from https://cli.github.com"
    echo "Option B: Create repo manually at https://github.com/new"
    echo ""
    exit 1
fi

echo "Step 1: Authentication"
echo "════════════════════════"
echo ""
gh auth login

echo ""
echo "Step 2: Create Repository"
echo "════════════════════════"
echo ""
REPO_NAME="video-streaming-app"
REPO_DESCRIPTION="Video streaming website with upload and playback"

gh repo create $REPO_NAME \
    --public \
    --source=. \
    --remote=origin \
    --push \
    --description="$REPO_DESCRIPTION"

if [ $? -ne 0 ]; then
    echo "Failed to create repository"
    exit 1
fi

echo ""
echo "✅ Repository created and code pushed!"
echo ""
echo "Repository URL: https://github.com/$(gh api user -q .login)/$REPO_NAME"
echo ""

echo "Step 3: Deploy to Vercel"
echo "════════════════════════"
echo ""
echo "1. Go to: https://vercel.com"
echo "2. Click: New Project"
echo "3. Click: Import Git Repository"
echo "4. Select: $REPO_NAME"
echo "5. Add Environment Variable:"
echo "   - Name: JWT_SECRET"
echo "   - Value: your-secret-key"
echo "6. Click: Deploy"
echo ""

echo "🎉 Your website will be live in 2-3 minutes!"
echo ""
