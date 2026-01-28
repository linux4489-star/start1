# ✅ Pre-Deployment Checklist

Your Vercel serverless configuration is ready. Before deploying, verify:

## Files Check

- ✅ `api/index.js` - Serverless handler (exports app correctly)
- ✅ `vercel.json` - Routing configuration 
- ✅ `package.json` - Dependencies and main entry point
- ✅ `public/index.html` - Frontend entry point
- ✅ `public/app.js` - Frontend app code
- ✅ `public/styles.css` - Styling
- ✅ `.gitignore` - Git ignore rules
- ✅ `.vercelignore` - Vercel ignore rules

## Configuration Check

### package.json
```json
{
  "main": "api/index.js",
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5",
    "uuid": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.3"
  }
}
```

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.js"
    },
    {
      "src": "/uploads/(.*)",
      "dest": "uploads/$1"
    },
    {
      "src": "/.*",
      "dest": "public/index.html"
    }
  ]
}
```

## Step-by-Step Deployment

### 1. Commit to Git
```powershell
cd c:\FullGTA_Game\video-streaming-app
git add .
git commit -m "Add Vercel serverless configuration"
git push origin main
```

### 2. Deploy to Vercel
```powershell
# Option A: Via website (easiest)
# Visit https://vercel.com → New Project → Import Git Repo

# Option B: Via CLI
npm install -g vercel
vercel --prod
```

### 3. Set Environment Variable
In Vercel dashboard:
1. Project Settings → Environment Variables
2. Add: `JWT_SECRET` = `your-secret-key`
3. Redeploy

### 4. Test Deployment
```powershell
$URL = "https://your-project.vercel.app"
curl.exe "$URL/api/health"
# Should return: {"status":"ok","message":"Server is running"}
```

## What's Different from Local Development

| Aspect | Local (server.js) | Vercel (api/index.js) |
|--------|-------------------|----------------------|
| Port | 3000 | Managed by Vercel |
| Listen | `app.listen()` | Exports `app` |
| File Storage | `./uploads/videos/` | `/tmp/uploads/videos/` |
| Persistence | Files remain | Ephemeral (deleted after request) |
| Database | In-memory arrays | Need to add MongoDB/Firebase |

## After Deployment: Next Steps

### 1. Enable HTTPS (Automatic)
✅ Vercel provides free SSL/TLS

### 2. Configure Domain (Optional)
Add custom domain in Vercel dashboard

### 3. Add Persistent Storage
Update `api/index.js` to use:
- AWS S3 for video files
- MongoDB Atlas for user/video metadata
- Firebase for real-time features

### 4. Monitor Performance
- View logs: Vercel dashboard → Deployments
- Check function runtime: Analytics
- Set up error alerts

## Troubleshooting Commands

```powershell
# View deployment status
vercel status

# View logs in real-time
vercel logs --follow

# View deployment list
vercel list

# Force redeploy
vercel --prod --force

# Check environment variables
vercel env list

# Remove local Vercel cache
Remove-Item -Recurse -Force .vercel
```

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project URL**: Will be shown after first deployment
- **Logs**: Vercel Dashboard → Deployments → [Latest] → Logs
- **Docs**: https://vercel.com/docs/concepts/functions/serverless-functions
- **Git Integration**: https://vercel.com/docs/concepts/git

## Environment Variables Needed

```
JWT_SECRET=your-production-secret-key
NODE_ENV=production (optional, Vercel sets automatically)
```

## Common Issues & Solutions

| Issue | Cause | Fix |
|-------|-------|-----|
| `404 DEPLOYMENT_NOT_FOUND` | Deployment didn't complete | Check build logs, retry deploy |
| `Cannot find module` | Missing dependency | Add to `package.json`, redeploy |
| `500 on /api/videos` | JWT_SECRET not set | Add env var in Vercel dashboard |
| `/uploads/` returns 404 | Static files not served | Check vercel.json routes |

## When Ready to Deploy

1. ✅ All files are in place
2. ✅ Configuration verified
3. ✅ Git repository created
4. ✅ Vercel account ready
5. ✅ Run: `vercel --prod`
6. ✅ Add JWT_SECRET in Vercel dashboard
7. ✅ Test endpoints

---

**Status**: ✅ Ready for Deployment
**Last Updated**: January 28, 2026
**Next Action**: Deploy to Vercel
