# 🚀 CREATE GITHUB REPO & DEPLOY - STEP BY STEP

Your local code is ready. Now we need to:
1. Create GitHub repository
2. Push code
3. Deploy to Vercel

---

## STEP 1: CREATE GITHUB REPOSITORY

### Option A: Via Website (Easiest)

1. **Go to GitHub**
   - Open browser
   - Visit: https://github.com/new
   - Or login to https://github.com first if not already logged in

2. **Create New Repository**
   - Repository name: `video-streaming-app`
   - Description: `Video streaming website with upload and playback`
   - Visibility: Public (so Vercel can access it)
   - DO NOT initialize with README, .gitignore, or license
   - Click "Create repository"

3. **Copy HTTPS URL**
   - After creation, copy the URL shown
   - It will look like: `https://github.com/YOUR-USERNAME/video-streaming-app.git`
   - Keep this URL for the next step

---

## STEP 2: PUSH YOUR CODE

Once you have the GitHub repository URL, run these commands:

```powershell
cd c:\FullGTA_Game\video-streaming-app

# Replace URL with the one from your GitHub repo
git remote set-url origin https://github.com/YOUR-USERNAME/video-streaming-app.git

# Set up git user (if not done before)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Push to GitHub
git push -u origin main
```

If asked for credentials:
- Username: Your GitHub username
- Password: Your GitHub personal access token (or password if 2FA not enabled)

**Expected output:**
```
Enumerating objects: ...
Counting objects: ...
Compressing objects: ...
Writing objects: ...
remote: Resolving deltas: ...
To https://github.com/YOUR-USERNAME/video-streaming-app.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## STEP 3: VERIFY ON GITHUB

1. Go to your GitHub repo: `https://github.com/YOUR-USERNAME/video-streaming-app`
2. You should see:
   - All your files uploaded
   - Green checkmark next to files
   - "main" branch selected
   - Recent commit visible

---

## STEP 4: DEPLOY TO VERCEL

Once code is on GitHub:

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Login or create account

2. **Create New Project**
   - Click "Add New"
   - Select "Project"
   - Click "Import Git Repository"

3. **Connect GitHub Repository**
   - Search for: `video-streaming-app`
   - Click to select your repository
   - Click "Import"

4. **Configure Project**
   - Framework: Select "Other" (or leave blank)
   - Build command: (leave empty)
   - Output directory: (leave empty)
   - Root directory: (leave empty)
   - Click "Continue"

5. **Add Environment Variables**
   - Click "Add environment variables"
   - Name: `JWT_SECRET`
   - Value: `production-secret-key-2026` (or any secure key)
   - Click "Add"
   - Click "Deploy"

6. **Wait for Deployment**
   - Vercel will build and deploy
   - Takes 2-3 minutes
   - You'll see a checkmark when done

7. **Your Website is LIVE!**
   - URL will be: `https://video-streaming-app-YOUR-USERNAME.vercel.app`
   - Or custom URL based on your project name
   - Visit the URL to see your website live!

---

## TROUBLESHOOTING

### "fatal: Authentication failed"
**Solution:**
```powershell
# Set credentials helper
git config --global credential.helper wincred

# Try again
git push -u origin main
```

### "Repository not found"
**Solution:**
1. Make sure you created the repo on GitHub.com
2. Make sure the URL is correct
3. Make sure the repo is PUBLIC (not private)
4. Try again with correct URL:
   ```powershell
   git remote set-url origin https://github.com/YOUR-USERNAME/video-streaming-app.git
   git push -u origin main
   ```

### "HTTP 403 - permission denied"
**Solution:**
1. Verify GitHub username is correct
2. Generate personal access token at: https://github.com/settings/tokens
3. Use token as password instead of GitHub password

---

## COMMANDS CHEAT SHEET

```powershell
# Check current remote
git remote -v

# Update remote URL
git remote set-url origin https://github.com/YOUR-USERNAME/video-streaming-app.git

# Check git user
git config user.name
git config user.email

# Set git user
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Push to GitHub
git push -u origin main

# Check status
git status

# View recent commits
git log --oneline -5
```

---

## WHAT YOU'LL HAVE

After completing all steps:

✅ GitHub Repository
   - Your code backed up on GitHub
   - Version control history
   - Shareable repository URL

✅ Vercel Deployment
   - Website live on internet
   - Public URL accessible 24/7
   - HTTPS enabled automatically
   - Global CDN active

✅ Live Website
   - Accessible from anywhere
   - Works on all devices
   - Users can sign up
   - Users can upload videos
   - Users can stream videos

---

## FINAL CHECKLIST

Before deploying:
- [ ] You have a GitHub account
- [ ] You created a new GitHub repository
- [ ] Repository is PUBLIC
- [ ] You copied the HTTPS URL
- [ ] You have your GitHub username/email

During push:
- [ ] Ran `git remote set-url origin ...`
- [ ] Ran `git config --global user.name` and email
- [ ] Ran `git push -u origin main`
- [ ] Code appeared on GitHub.com

During Vercel deploy:
- [ ] Logged into Vercel
- [ ] Imported GitHub repository
- [ ] Added JWT_SECRET environment variable
- [ ] Clicked Deploy
- [ ] Waited for build to complete

After deployment:
- [ ] Visited your Vercel URL
- [ ] Website loads successfully
- [ ] Can see login page
- [ ] Can create account
- [ ] Can upload video

---

## NEXT STEPS

1. **Create GitHub repository** → https://github.com/new
2. **Push your code** → Use commands above
3. **Deploy to Vercel** → https://vercel.com
4. **Share your website!** → Your new public URL

---

## QUESTIONS?

- **GitHub Help**: https://help.github.com
- **Vercel Docs**: https://vercel.com/docs
- **Can't create repo?** Make sure you're logged into GitHub
- **Push failed?** Check git remote with: `git remote -v`
- **Deployment failed?** Check Vercel logs in dashboard

---

**Your code is ready. Let's get it online! 🚀**
