# MovieHub - Production Ready
# Self-Hosted Deployment Guide

## Instant Deployment (Windows)

**Step 1:** Install Docker Desktop from https://www.docker.com/products/docker-desktop

**Step 2:** Run this command in the project folder:
```
DEPLOY_NOW.bat
```

That's it! Your app will be live at `http://localhost:3000`

---

## Instant Deployment (Mac/Linux)

**Step 1:** Install Docker from https://docs.docker.com/get-docker/

**Step 2:** Run:
```bash
chmod +x deploy_production.sh
./deploy_production.sh
```

Your app will be live at `http://localhost:3000`

---

## Cloud Deployment Options

### Option 1: Heroku (Free tier available)
```bash
heroku login
heroku create your-app-name
heroku config:set JWT_SECRET=your-secret-key
git push heroku main
```
Your app will be live at `https://your-app-name.herokuapp.com`

### Option 2: Railway (Recommended - GitHub integration)
1. Go to https://railway.app
2. Create account and connect GitHub
3. Click "New Project" → Select your repo
4. Railway auto-deploys. Live in 2 minutes!

### Option 3: Render.com
1. Go to https://render.com
2. Create account and connect GitHub
3. New Web Service → Select repo
4. Set environment variables:
   - JWT_SECRET=your-secret-key
5. Deploy!

### Option 4: AWS EC2 (Full control)
1. Create EC2 instance (Ubuntu 20.04)
2. SSH into instance
3. Install Docker: `curl -fsSL https://get.docker.com | sh`
4. Clone repo and run DEPLOY_NOW.bat / deploy_production.sh

---

## Credentials

**Default Admin Account:**
- Email: owner@moviehub.com
- Password: linux@5566

---

## Troubleshooting

**Docker not found?**
- Restart Docker Desktop after installation
- Ensure Docker daemon is running

**Port 3000 already in use?**
```bash
docker-compose down
# Or change port in docker-compose.yml line 6
```

**Videos not persisting?**
Videos are stored in `./uploads/videos` directory by default. For production, integrate AWS S3 or similar cloud storage.

---

## What's Included

✅ Node.js + Express server  
✅ JWT authentication  
✅ Video upload & streaming  
✅ Responsive web UI  
✅ Production-ready code  
✅ Docker containerization  
✅ Ready for cloud platforms  

**Next Steps:**
1. Customize with your own domain
2. Add SSL certificate (HTTPS)
3. Connect to MongoDB for persistent data
4. Add AWS S3 for video storage
5. Scale as needed!

---

**Need Help?**
See TROUBLESHOOTING.md or check logs:
```bash
docker-compose logs -f
```
