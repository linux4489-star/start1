# Vercel Deployment Guide

## What was wrong?

Your application crashed with a `FUNCTION_INVOCATION_FAILED` error because:

1. **Traditional Server Setup** - The original `server.js` used `app.listen()` which doesn't work in Vercel's serverless environment
2. **Fixed Port Binding** - Port 3000 binding is invalid for serverless functions
3. **File System Persistence** - Uploaded videos stored in local filesystem are lost between function invocations
4. **In-Memory Database** - User data and videos stored in memory arrays are lost on restart

## Changes Made

### ✅ 1. Created Serverless Handler (`api/index.js`)
- Exports Express app as a module instead of calling `listen()`
- Compatible with Vercel's Node.js runtime
- Uses `/tmp` directory for temporary file storage

### ✅ 2. Added Vercel Configuration (`vercel.json`)
- Routes API requests to `api/index.js`
- Serves static files from `public/` folder
- Proper build and routing configuration

### ✅ 3. Updated Frontend (`public/app.js`)
- Changed API endpoint from port 5000 to 3000

## Deployment Steps

### Local Testing First

1. **Install dependencies:**
   ```bash
   cd video-streaming-app
   npm install
   ```

2. **Test locally:**
   ```bash
   npm start
   # Server runs on http://localhost:3000
   ```

3. **Verify endpoints work:**
   ```bash
   curl http://localhost:3000
   curl http://localhost:3000/api/health
   ```

### Deploy to Vercel

#### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
cd video-streaming-app
vercel

# For production deployment
vercel --prod
```

#### Option 2: GitHub Integration

1. Push code to GitHub repository
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variables:
   - `JWT_SECRET` = your-secure-secret-key
5. Click Deploy

#### Option 3: Drag & Drop

1. Visit https://vercel.com
2. Drag and drop the `video-streaming-app` folder
3. Configure environment variables
4. Deploy

## Environment Variables

Create a `.env.local` file for local development or set them in Vercel dashboard:

```
JWT_SECRET=your-production-secret-key
NODE_ENV=production
```

## Storage Limitations

**⚠️ Important:** Vercel's filesystem is ephemeral - files are deleted when the function is not in use.

### For Production:
1. **Use Cloud Storage (Recommended):**
   - AWS S3
   - Google Cloud Storage
   - Cloudinary (video hosting)

2. **Use a Database:**
   - MongoDB Atlas
   - Firebase Firestore
   - PostgreSQL (via Supabase)

3. **Implement example:**
```javascript
// Replace fs operations with AWS S3 or similar
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

app.post('/api/upload', authenticateToken, upload.single('video'), async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.file.filename,
    Body: req.file.buffer
  };
  
  const data = await s3.upload(params).promise();
  // Store metadata in database
});
```

## Monitoring & Debugging

### Check Vercel Logs

```bash
vercel logs
# or
vercel logs --follow
```

### Common Issues & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| `FUNCTION_INVOCATION_FAILED` | Module errors | Check logs with `vercel logs` |
| 404 on API routes | Wrong routing config | Verify `vercel.json` routes |
| Videos not persisting | Ephemeral filesystem | Use cloud storage (S3, etc.) |
| CORS errors | Missing headers | CORS middleware is configured |
| 500 on upload | File size | Limit set to 5GB; Vercel max is 4.5MB for free tier |

### Increase Function Timeout

In `vercel.json`:
```json
{
  "functions": {
    "api/index.js": {
      "maxDuration": 60
    }
  }
}
```

## Test Your Deployment

After deploying, test endpoints:

```bash
# Replace YOUR_VERCEL_URL with your actual Vercel URL
curl https://YOUR_VERCEL_URL.vercel.app/api/health

# Login
curl -X POST https://YOUR_VERCEL_URL.vercel.app/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@moviehub.com",
    "password": "linux@5566"
  }'

# Get videos
curl https://YOUR_VERCEL_URL.vercel.app/api/videos
```

## Roll Back to Local Server

If you need to keep a local development version:
- Keep the original `server.js` for local development
- Use `npm start` for local testing
- Deploy the serverless version to Vercel

## Next Steps

1. ✅ Deploy to Vercel
2. Set `JWT_SECRET` in environment variables
3. Implement cloud storage for video persistence
4. Set up a proper database (MongoDB, Firebase, etc.)
5. Enable HTTPS (automatic with Vercel)
6. Monitor performance in Vercel dashboard

## Support

- Vercel Docs: https://vercel.com/docs
- Express.js on Vercel: https://vercel.com/guides/using-express-with-vercel
- Report issues: Check Vercel logs (`vercel logs --follow`)
