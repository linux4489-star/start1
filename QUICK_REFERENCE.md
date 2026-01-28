# 🚀 QUICK REFERENCE CARD

## ONE COMMAND TO RULE THEM ALL

Want to test locally first?
```powershell
npm install && npm start
# Opens http://localhost:3000
```

---

## DEPLOYMENT OPTIONS (Choose One)

### ⭐ VERCEL (RECOMMENDED)
```powershell
# 1. Create GitHub account: https://github.com/signup
# 2. Push code:
git remote add origin https://github.com/YOUR-USERNAME/video-streaming-app.git
git branch -M main
git push -u origin main

# 3. Deploy: https://vercel.com → Import GitHub → Deploy
```
**Result:** `https://your-project.vercel.app` ✅

---

### 🔵 RENDER
```powershell
# 1. Push to GitHub (same as above)
# 2. Go to https://render.com
# 3. New Web Service → Connect GitHub
```
**Result:** `https://your-project.onrender.com` ✅

---

### 🟡 RAILWAY
```powershell
# 1. Push to GitHub (same as above)
# 2. Go to https://railway.app
# 3. Start Project → Deploy from GitHub
```
**Result:** `https://your-project.up.railway.app` ✅

---

### 💚 HEROKU
```powershell
npm install -g heroku
heroku login
heroku create your-app-name
heroku config:set JWT_SECRET=your-secret-key
git push heroku main
```
**Result:** `https://your-app-name.herokuapp.com` ✅

---

### 💻 LOCAL (Test First)
```powershell
npm install
npm start
```
**Result:** `http://localhost:3000` ✅

---

## ESSENTIALS

| What | Command |
|------|---------|
| Install deps | `npm install` |
| Start locally | `npm start` |
| Check Git status | `git status` |
| Push changes | `git push` |
| View logs | `vercel logs` |
| Clear cache | `rm -r node_modules && npm install` |

---

## ENVIRONMENT VARIABLES

Must set on deployment platform:
```
JWT_SECRET=your-secret-key
```

---

## DEFAULT LOGIN

```
Email: owner@moviehub.com
Password: linux@5566
```

---

## DOCUMENTATION

| File | Read When |
|------|-----------|
| `DEPLOY_IN_5_MINUTES.md` | First time |
| `START_HERE.md` | Overview needed |
| `PUBLISH_GUIDE.md` | All options |
| `404_RESOLVED.md` | Technical details |

---

## GIT WORKFLOW

```powershell
# Make changes
nano file.js

# Stage changes
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Vercel auto-redeploys!
```

---

## TROUBLESHOOTING

```powershell
# Check what changed
git status

# Undo last commit
git reset --soft HEAD~1

# View commits
git log --oneline

# Remove remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/USER/REPO.git
```

---

## FILE STRUCTURE

```
api/index.js ............... Main app
public/
  ├── index.html .......... Homepage
  ├── app.js ............. Logic
  └── styles.css ......... Styling
package.json ............ Dependencies
vercel.json ............ Deployment config
```

---

## QUICK STATS

- **Languages**: Node.js, Express, HTML, CSS, JavaScript
- **Authentication**: JWT + bcryptjs
- **Database**: In-memory (upgrade for production)
- **Hosting**: Vercel (serverless)
- **Cost**: FREE (Vercel free tier)
- **Speed**: Deploy in 5 minutes

---

## 🎯 ACTION ITEMS

- [ ] Read `DEPLOY_IN_5_MINUTES.md`
- [ ] Create GitHub account
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Test your live site
- [ ] Celebrate! 🎉

---

**More details?** See `START_HERE.md`

**Everything is ready!** 🚀
