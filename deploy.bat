@echo off
REM Quick Deploy Script for Windows - Vercel/Render/Railway

echo.
echo 🚀 Video Streaming App - Deploy Script
echo ======================================
echo.
echo Choose deployment platform:
echo 1) Vercel (Recommended - Free)
echo 2) Render
echo 3) Railway
echo 4) Local Server
echo.
set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    cls
    echo === VERCEL DEPLOYMENT ===
    echo.
    set /p GITHUB_USERNAME="Enter your GitHub username: "
    echo.
    echo Pushing to GitHub...
    cd /d "%~dp0"
    git remote add origin https://github.com/%GITHUB_USERNAME%/video-streaming-app.git
    git branch -M main
    git push -u origin main
    echo.
    echo ✅ Code pushed to GitHub!
    echo.
    echo Next steps:
    echo 1. Go to https://vercel.com
    echo 2. Click 'New Project'
    echo 3. Import your GitHub repository
    echo 4. Add JWT_SECRET environment variable
    echo 5. Click Deploy
    echo.
    echo Your site will be live at: https://video-streaming-app.vercel.app
    pause
) else if "%choice%"=="2" (
    cls
    echo === RENDER DEPLOYMENT ===
    echo.
    set /p GITHUB_USERNAME="Enter your GitHub username: "
    echo.
    echo Pushing to GitHub...
    cd /d "%~dp0"
    git remote add origin https://github.com/%GITHUB_USERNAME%/video-streaming-app.git
    git branch -M main
    git push -u origin main
    echo.
    echo Next steps:
    echo 1. Go to https://render.com
    echo 2. Click 'New +' ^> 'Web Service'
    echo 3. Connect your GitHub repository
    echo 4. Add JWT_SECRET environment variable
    echo 5. Deploy
    pause
) else if "%choice%"=="3" (
    cls
    echo === RAILWAY DEPLOYMENT ===
    echo.
    set /p GITHUB_USERNAME="Enter your GitHub username: "
    echo.
    echo Pushing to GitHub...
    cd /d "%~dp0"
    git remote add origin https://github.com/%GITHUB_USERNAME%/video-streaming-app.git
    git branch -M main
    git push -u origin main
    echo.
    echo Next steps:
    echo 1. Go to https://railway.app
    echo 2. Click 'Start Project'
    echo 3. Select 'Deploy from GitHub'
    echo 4. Choose your repository
    echo 5. Add JWT_SECRET environment variable
    pause
) else if "%choice%"=="4" (
    cls
    echo === LOCAL SERVER ===
    echo.
    echo Installing dependencies...
    cd /d "%~dp0"
    call npm install
    echo.
    echo Starting server...
    call npm start
) else (
    echo Invalid choice
    pause
    exit /b 1
)
