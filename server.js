const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = 3000; // Fixed port
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads', 'videos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const videoId = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${videoId}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5GB limit
  fileFilter: (req, file, cb) => {
    // Accept any file starting with video/ or with video extensions
    if (file.mimetype.startsWith('video/') || 
        /\.(mp4|webm|avi|mov|flv|mkv|wmv|m4v|3gp)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(null, true); // Allow all files - let browser/user decide
    }
  }
});

// In-memory database (replace with MongoDB in production)
let users = [];
let videos = [];

// Initialize with a default owner account
async function initializeDefaultUser() {
  const hashedPassword = await bcrypt.hash('linux@5566', 10);
  users.push({
    id: uuidv4(),
    username: 'diwarasiga',
    email: 'owner@moviehub.com',
    password: hashedPassword,
    createdAt: new Date()
  });
  console.log('Default owner account created: username=diwarasiga, password=linux@5566');
}

// Initialize default user on startup
initializeDefaultUser().catch(console.error);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// API Routes

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Auth Endpoints

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    if (users.find(u => u.email === email || u.username === username)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(user);

    // Create token
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      success: true, 
      token, 
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      success: true, 
      token, 
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
app.get('/api/user', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.post('/api/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

// Upload video
app.post('/api/upload', authenticateToken, upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const video = {
    id: req.file.filename.split('.')[0],
    title: req.body.title || req.file.originalname,
    filename: req.file.filename,
    filepath: `/videos/${req.file.filename}`,
    size: req.file.size,
    uploadDate: new Date(),
    duration: req.body.duration || 0,
    thumbnail: req.body.thumbnail || '/images/default-thumbnail.jpg',
    ownerId: req.user.id,
    ownerName: req.user.username
  };

  videos.push(video);
  res.json({ success: true, video });
});

// Get all videos
app.get('/api/videos', (req, res) => {
  const videoList = videos.map(v => ({
    ...v,
    filepath: `/uploads/videos/${v.filename}`
  }));
  res.json(videoList);
});

// Get video by ID
app.get('/api/videos/:id', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  video.filepath = `/uploads/videos/${video.filename}`;
  res.json(video);
});

// Stream video
app.get('/uploads/videos/:filename', (req, res) => {
  const videoPath = path.join(uploadsDir, req.params.filename);
  
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    });
    fs.createReadStream(videoPath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Delete video
app.delete('/api/videos/:id', (req, res) => {
  const videoIndex = videos.findIndex(v => v.id === req.params.id);
  
  if (videoIndex === -1) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const video = videos[videoIndex];
  const videoPath = path.join(uploadsDir, video.filename);

  if (fs.existsSync(videoPath)) {
    fs.unlinkSync(videoPath);
  }

  videos.splice(videoIndex, 1);
  res.json({ success: true, message: 'Video deleted' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Get local IP address
const os = require('os');
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🎬 MovieHub Video Streaming Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📱 Local Access:      http://localhost:${PORT}`);
  console.log(`🌐 Network Access:    http://${localIP}:${PORT}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Login: owner@moviehub.com | Password: linux@5566`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
