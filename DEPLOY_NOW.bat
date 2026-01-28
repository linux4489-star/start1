@echo off
REM One-Click Production Deployment
REM Run this script to deploy the video streaming app

echo.
echo ========================================
echo  MOVIEHUB - PRODUCTION DEPLOYMENT
echo ========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not in PATH
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Build and start containers
echo [1/4] Building Docker image...
docker-compose build --no-cache
if %errorlevel% neq 0 goto :error

echo.
echo [2/4] Starting application...
docker-compose up -d
if %errorlevel% neq 0 goto :error

REM Wait for app to start
echo.
echo [3/4] Waiting for application to start...
timeout /t 3 /nobreak

REM Check if app is running
docker ps | find "moviehub" >nul 2>&1
if %errorlevel% neq 0 goto :error

echo.
echo [4/4] Application started successfully!
echo.
echo ========================================
echo  DEPLOYMENT COMPLETE
echo ========================================
echo.
echo Your application is now live at:
echo   http://localhost:3000
echo.
echo Default Login Credentials:
echo   Email: owner@moviehub.com
echo   Password: linux@5566
echo.
echo To stop the application:
echo   docker-compose down
echo.
echo To view logs:
echo   docker-compose logs -f
echo.
echo To deploy to cloud (Heroku, AWS, etc):
echo   1. Create account on your chosen platform
echo   2. Install platform CLI (heroku, aws, railway)
echo   3. Run: heroku create yourappname (for Heroku)
echo   4. Run: git push heroku main
echo.
pause
exit /b 0

:error
echo.
echo ERROR: Deployment failed!
echo Check Docker is running and you have sufficient disk space
pause
exit /b 1
