# Quick Start Guide - MovieHub Video Streaming

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies
Open PowerShell in the `video-streaming-app` folder and run:
```powershell
npm install
```

### Step 2: Start the Server
```powershell
npm start
```

You should see:
```
Video Streaming Server running on http://localhost:5000
```

### Step 3: Open in Browser
Click this link: **http://localhost:5000**

Or type it in your browser's address bar.

---

## 📱 Features Overview

### Home Page
- Browse all uploaded movies
- Search movies by title
- Click any movie to watch

### Upload Movie
- Click "Upload Movie" in menu
- Select your video file (MP4, WebM, AVI, MOV)
- Add a title
- Click upload (shows progress)

### My Library
- View all your uploaded videos
- Click to play any video
- Delete videos if needed

---

## 🎮 How to Use

### Watch a Movie
1. On home page, click any movie card
2. Player opens in full screen
3. Use play/pause/volume controls
4. Click X to close player

### Upload a Movie
1. Click "Upload Movie" in top menu
2. Enter movie title
3. Drag & drop video or click to browse
4. Click "Upload Movie"
5. Wait for completion (progress bar shown)

### Search Movies
1. Use search bar on home page
2. Type movie title
3. Results filter in real-time

---

## 💾 Supported Video Formats

✅ MP4 (Recommended)
✅ WebM
✅ AVI
✅ MOV
✅ FLV

❌ No: .mkv, .rar, .zip, other non-video formats

---

## 📱 Works on Mobile!

- Fully responsive design
- Touch-friendly controls
- Works on:
  - iPhone/iPad
  - Android phones/tablets
  - All modern browsers

---

## ⚙️ Server Information

- **URL**: http://localhost:5000
- **Upload Limit**: 5GB per file
- **Videos Storage**: `uploads/videos/` folder
- **Port**: 5000 (can change in .env file)

---

## 🛠️ Troubleshooting

### "Port already in use"
Change port in `.env`:
```
PORT=3000
```

### "Cannot connect to localhost:5000"
- Make sure `npm start` is running
- Wait 2-3 seconds after starting
- Try refreshing the page (Ctrl+R)

### "Video won't play"
- Try downloading video in MP4 format
- Check file isn't corrupted
- Refresh browser page

### "Video won't upload"
- Check video format is supported
- Ensure file under 5GB
- Check disk has free space
- Try a smaller video first

---

## 📊 File Locations

- **Frontend**: `public/index.html`, `public/app.js`, `public/styles.css`
- **Backend**: `server.js`
- **Videos**: `uploads/videos/` (created on first upload)
- **Config**: `.env`

---

## 🔧 Advanced: Change Settings

Edit `.env` file to customize:

```env
# Port number (default 5000)
PORT=5000

# Environment (development or production)
NODE_ENV=development
```

Then restart the server (`Ctrl+C` then `npm start`).

---

## 📞 Common Questions

**Q: How big can videos be?**
A: Up to 5GB per file

**Q: Where are videos stored?**
A: In the `uploads/videos/` folder on your server

**Q: Can multiple people use it?**
A: Yes! Anyone can access http://localhost:5000 (or your server IP)

**Q: How do I make it public on the internet?**
A: Deploy to a service like Heroku, AWS, or DigitalOcean

---

## ✨ Enjoy!

Your video streaming website is ready! Start uploading and watching movies! 🎬🍿
