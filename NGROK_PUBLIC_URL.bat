@echo off
echo.
echo ========================================
echo  GET NGROK PUBLIC URL
echo ========================================
echo.
echo Your app is running at: http://localhost:3000
echo.
echo To get a PUBLIC URL (anyone can access):
echo.
echo 1. Download ngrok from: https://ngrok.com/download
echo.
echo 2. Extract the zip file
echo.
echo 3. Open a NEW terminal/command prompt
echo.
echo 4. Navigate to the ngrok folder
echo.
echo 5. Run this command:
echo    ngrok http 3000
echo.
echo 6. ngrok will show output like:
echo.
echo    Forwarding    https://abc123.ngrok.io -> http://localhost:3000
echo.
echo 7. Your PUBLIC URL is: https://abc123.ngrok.io
echo.
echo 8. Share that URL with anyone!
echo.
echo ========================================
echo.
echo Example output:
echo.
echo Session Status                online
echo Account                       (Plan: Free)
echo Version                       3.3.1
echo Region                        United States (us)
echo Web Interface                 http://127.0.0.1:4040
echo Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
echo Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
echo.
echo ========================================
echo.
echo The PUBLIC URL is the https://abc123.ngrok.io link!
echo.
pause
