@echo off
REM ============================================
REM INSTANT DEPLOY - Press Enter to continue
REM ============================================

cls
color 0A
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                                                         ║
echo ║   🚀 INSTANT WEBSITE DEPLOYMENT - FOLLOW STEPS BELOW    ║
echo ║                                                         ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo.
echo STEP 1: CREATE GITHUB ACCOUNT
echo ================================
echo.
echo 1. Open your browser
echo 2. Go to: https://github.com/signup
echo 3. Create your free account
echo 4. Email ......... [enter your email]
echo 5. Username ...... [COPY THIS - you'll need it!]
echo 6. Password ...... [enter password]
echo 7. Click "Create account"
echo.
echo Once done, come back here and press ENTER
pause

cls
echo STEP 2: DEPLOY CODE
echo ===================
echo.
echo Enter your GitHub USERNAME (the one you just created):
set /p GITHUB_USER="GitHub Username: "

cls
echo STEP 3: PUSHING CODE
echo ====================
echo.
echo Your username: %GITHUB_USER%
echo.
echo Now I'll push your code to GitHub...
echo.
cd /d "%~dp0"

git remote add origin https://github.com/%GITHUB_USER%/video-streaming-app.git
if errorlevel 1 (
    echo [INFO] Remote already exists, updating...
    git remote set-url origin https://github.com/%GITHUB_USER%/video-streaming-app.git
)

echo.
echo Pushing to GitHub...
git push -u origin master
if errorlevel 1 (
    echo.
    echo ⚠️  Push failed. This is normal if you're pushing master instead of main.
    echo Trying with main branch...
    git branch -M main
    git push -u origin main
)

cls
echo ✅ CODE PUSHED TO GITHUB!
echo =======================
echo.
echo Your code is now on GitHub at:
echo https://github.com/%GITHUB_USER%/video-streaming-app
echo.
echo.
echo STEP 4: DEPLOY TO VERCEL
echo ========================
echo.
echo 1. Open your browser
echo 2. Go to: https://vercel.com/signup
echo 3. Click "Continue with GitHub"
echo 4. Authorize Vercel to access GitHub
echo 5. Click "New Project"
echo 6. Click "Import Git Repository"
echo 7. Select: video-streaming-app
echo 8. Click "Import"
echo 9. Set Environment Variable:
echo    - Name: JWT_SECRET
echo    - Value: your-production-secret-key
echo 10. Click "Deploy"
echo.
echo Once deployed, your website will be at:
echo https://video-streaming-app.vercel.app
echo.
echo.
pause

cls
echo 🎉 ALMOST DONE!
echo ===============
echo.
echo Your website will be live in 1-2 minutes!
echo.
echo Once you see the checkmark on Vercel dashboard, visit:
echo https://video-streaming-app.vercel.app
echo.
echo Login with:
echo Email: owner@moviehub.com
echo Password: linux@5566
echo.
echo Thank you for using our deployment script!
echo.
pause
