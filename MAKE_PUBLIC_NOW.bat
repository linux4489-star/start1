@echo off
echo.
echo ========================================
echo  MOVIEHUB - MAKE PUBLIC WITH TUNNEL
echo ========================================
echo.
echo Your app is running at: http://localhost:3000
echo.
echo To make it PUBLIC (shareable URL), install Cloudflare Tunnel:
echo.
echo 1. Download Cloudflare Tunnel:
echo    https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
echo.
echo 2. Run this command:
echo    cloudflare-tunnel.exe tunnel --url http://localhost:3000
echo.
echo 3. Cloudflare will give you a public URL like:
echo    https://moviehub-xxxxx.trycloudflare.com
echo.
echo 4. Share that URL with anyone!
echo.
echo Alternatively, use ngrok (also free):
echo.
echo 1. Download: https://ngrok.com/download
echo 2. Run: ngrok http 3000
echo 3. Copy the public URL and share!
echo.
echo ========================================
echo.
pause
