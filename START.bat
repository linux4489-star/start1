@echo off
REM MovieHub Video Streaming - Startup Script
echo.
echo ====================================
echo   MovieHub - Video Streaming App
echo ====================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [*] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed
        echo Make sure Node.js is installed
        pause
        exit /b 1
    )
)

REM Create uploads directory if it doesn't exist
if not exist "uploads\videos" (
    echo [*] Creating uploads directory...
    mkdir uploads\videos
)

REM Start the server
echo.
echo [*] Starting server on http://localhost:5000
echo [*] Press Ctrl+C to stop the server
echo.
timeout /t 2 /nobreak
call npm start

pause
