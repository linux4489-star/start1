#!/bin/bash
# MovieHub Video Streaming - Startup Script

echo ""
echo "===================================="
echo "  MovieHub - Video Streaming App"
echo "===================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[*] Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed"
        echo "Make sure Node.js is installed"
        exit 1
    fi
fi

# Create uploads directory if it doesn't exist
if [ ! -d "uploads/videos" ]; then
    echo "[*] Creating uploads directory..."
    mkdir -p uploads/videos
fi

# Start the server
echo ""
echo "[*] Starting server on http://localhost:5000"
echo "[*] Press Ctrl+C to stop the server"
echo ""
sleep 2
npm start
