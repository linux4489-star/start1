@echo off
REM ============================================
REM GitHub Setup and Deploy Script for Windows
REM ============================================

cls
color 0A

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║      GITHUB SETUP - Create Repo and Deploy            ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo.
echo STEP 1: GITHUB REPOSITORY SETUP
echo ════════════════════════════════
echo.
echo This script will help you:
echo  1. Create a GitHub repository
echo  2. Push your code
echo  3. Deploy to Vercel
echo.

echo.
echo ⚠️  FIRST, create the repository manually:
echo.
echo  1. Open browser
echo  2. Go to: https://github.com/new
echo  3. Create new repository named: video-streaming-app
echo  4. Make it PUBLIC
echo  5. DO NOT initialize with README
echo  6. Click Create
echo.
pause

echo.
echo STEP 2: PUSH CODE TO GITHUB
echo ════════════════════════════
echo.

cd /d "%~dp0"

echo Checking git status...
git status

echo.
echo Now pushing to GitHub...
echo.

REM Try to push (assumes remote is already set)
git push -u origin main

if errorlevel 1 (
    echo.
    echo ⚠️  Push failed. Check your GitHub URL:
    echo.
    git remote -v
    echo.
    echo To fix, run:
    echo  git remote set-url origin https://github.com/YOUR-USERNAME/video-streaming-app.git
    echo  git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Code pushed to GitHub successfully!
echo.
echo Your repository is at:
echo https://github.com/YOUR-USERNAME/video-streaming-app
echo.

pause

cls

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║         VERCEL DEPLOYMENT - Final Step                ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo STEP 3: DEPLOY TO VERCEL
echo ═════════════════════════
echo.
echo Next steps:
echo.
echo  1. Open browser
echo  2. Go to: https://vercel.com
echo  3. Sign up / Login
echo  4. Click "New Project"
echo  5. Click "Import Git Repository"
echo  6. Find and select: video-streaming-app
echo  7. Click "Import"
echo  8. Configure:
echo     - Leave build settings default
echo     - Add Environment Variable:
echo       * Name: JWT_SECRET
echo       * Value: your-secret-key
echo  9. Click "Deploy"
echo.
echo ⏱️  Wait 2-3 minutes for deployment
echo.
echo Your website will be live at:
echo https://video-streaming-app.vercel.app
echo (or custom domain if configured)
echo.

start https://vercel.com

pause

echo.
echo 🎉 Done! Your website is now LIVE!
echo.
pause
