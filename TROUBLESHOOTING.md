# Upload Error Troubleshooting Guide

## Common Upload Errors & Solutions

### ❌ Error: "Upload error: Network problem"

**Causes:**
- Server is not running
- Port 5000 is blocked
- CORS issue

**Solutions:**
1. **Make sure server is running:**
   ```powershell
   cd c:\FullGTA_Game\video-streaming-app
   npm start
   ```
   
2. **If port 5000 is busy, change it:**
   - Edit `.env` file
   - Change `PORT=5000` to `PORT=3000`
   - Restart server

3. **Check browser console (F12):**
   - Look for error messages
   - Check Network tab - does request reach server?

---

### ❌ Error: "Upload failed: Invalid file or request"

**Causes:**
- File is not a valid video
- Wrong file type
- Corrupted file

**Solutions:**
1. **Convert file to MP4:**
   ```bash
   ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
   ```

2. **Verify file format:**
   - Use: MP4, WebM, AVI, MOV, FLV only
   - NOT: MKV, RAR, ZIP, etc.

3. **Check file isn't corrupted:**
   - Try with a different video
   - Open it in media player first

---

### ❌ Error: "File too large. Max 5GB"

**Causes:**
- File exceeds 5GB limit

**Solutions:**
1. **Split large files:**
   ```bash
   ffmpeg -i large_video.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k compressed.mp4
   ```

2. **Compress video:**
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 28 -c:a aac output.mp4
   ```

3. **Increase limit in server.js** (not recommended):
   - Change: `limits: { fileSize: 5 * 1024 * 1024 * 1024 }`
   - To higher value like: `limits: { fileSize: 10 * 1024 * 1024 * 1024 }`

---

### ❌ Error: "Please enter a movie title"

**Causes:**
- Title field is empty or blank

**Solutions:**
1. Enter a title in the "Movie Title" field
2. Click upload

---

### ❌ Error: "Please select a valid video file"

**Causes:**
- Selected file is not a video
- Wrong file extension

**Solutions:**
1. Choose a .mp4, .webm, .avi, .mov, or .flv file
2. Ensure file is actually a video (not renamed)

---

### ❌ Upload is very slow

**Causes:**
- Large file size
- Slow internet connection
- Server overload

**Solutions:**
1. **Check internet connection:**
   - Test speed at speedtest.net
   - Close other downloads

2. **Compress video before uploading:**
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -preset fast -crf 23 -c:a aac output.mp4
   ```

3. **Split into smaller files:**
   - 500MB - 1GB per file is optimal

4. **Use browser DevTools:**
   - Press F12
   - Go to Network tab
   - Monitor upload speed

---

### ❌ Upload stops halfway

**Causes:**
- Network disconnection
- Browser timeout
- Server crash

**Solutions:**
1. **Check server is still running:**
   ```powershell
   npm start
   ```

2. **Try again with smaller file**

3. **Check firewall/antivirus:**
   - Disable temporarily to test
   - May be blocking upload

---

## Server Debug Checklist

### 1. Check Node.js is installed
```powershell
node --version
npm --version
```

Expected output: v14+ and npm 6+

### 2. Check dependencies installed
```powershell
cd c:\FullGTA_Game\video-streaming-app
ls node_modules
```

Should see folders like: express, multer, cors

### 3. Check port is available
```powershell
netstat -ano | findstr :5000
```

If shows results, port is in use

### 4. Test server connection
```powershell
curl http://localhost:5000
```

Should get HTML response

### 5. Check uploads folder exists
```powershell
ls -Path uploads\videos
```

If missing, create it:
```powershell
mkdir uploads\videos
```

---

## Browser Console Errors

### Open Console (F12 -> Console tab)

**"CORS error"**
- Server CORS middleware issue
- Check server.js has CORS enabled

**"404 Not Found"**
- Server not running
- Wrong API endpoint
- Video file not found

**"413 Payload Too Large"**
- File exceeds server limit
- Compress video or increase limit

**"Failed to fetch"**
- Server not running
- Network issue
- Port blocked

---

## Quick Fixes

### Fix 1: Restart Everything
```powershell
# Stop server (Ctrl+C)
# Close browser
# Open new terminal
cd c:\FullGTA_Game\video-streaming-app
npm start
# Refresh browser
```

### Fix 2: Clear Browser Cache
- Press Ctrl+Shift+Delete
- Select "All time"
- Clear cache
- Refresh page

### Fix 3: Reinstall Dependencies
```powershell
cd c:\FullGTA_Game\video-streaming-app
rm -r node_modules
rm package-lock.json
npm install
npm start
```

### Fix 4: Create Uploads Folder
```powershell
mkdir c:\FullGTA_Game\video-streaming-app\uploads\videos
```

### Fix 5: Check Disk Space
```powershell
Get-Volume C: | Select-Object SizeRemaining
```

Need at least 1GB free

---

## Still Not Working?

### Provide these details:

1. **Error message shown:**
   - Exact text?
   - Where appears (browser, console, server)?

2. **Server output:**
   - Any error messages when server starts?
   - Any errors after clicking upload?

3. **File details:**
   - File size?
   - File format?
   - File name?

4. **System info:**
   - Windows, Mac, Linux?
   - Node.js version?
   - Available disk space?

---

## Contact & Support

- Check README.md for API details
- Check QUICK_START.md for setup
- Review server.js for configuration
- Check browser DevTools (F12) for errors

---

**Happy uploading! 🎬**
