@echo off
REM Automated Railway.app Deployment
REM Prerequisites: Git, Node.js, and Railway CLI installed

echo.
echo ========================================
echo  DEPLOYING TO RAILWAY.APP
echo ========================================
echo.

REM Check for railway CLI
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Railway CLI...
    npm install -g @railway/cli
)

echo [1/5] Ensuring all files are committed...
git add -A
git commit -m "Auto-deploy to Railway" 2>nul || echo (no changes to commit)

echo.
echo [2/5] Logging into Railway...
railway login

echo.
echo [3/5] Creating Railway project...
railway init

echo.
echo [4/5] Setting environment variables...
railway variables set JWT_SECRET=production-secret-key-2026

echo.
echo [5/5] Deploying to Railway...
railway up

echo.
echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your app is now live on Railway!
echo Check your project dashboard at https://railway.app
echo.
pause
