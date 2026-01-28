const express = require('express');
const path = require('path');

module.exports = (req, res) => {
  // Serve static files from public directory
  const publicPath = path.join(__dirname, '..', 'public');
  
  // Try to serve static files first
  const fileName = req.url === '/' ? 'index.html' : req.url;
  const filePath = path.join(publicPath, fileName);
  
  // Check if file exists and serve it
  const fs = require('fs');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Set correct content type
    if (fileName.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    } else if (fileName.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (fileName.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    
    return res.end(content);
  }
  
  // If not a static file, serve index.html for SPA routing
  if (!fileName.includes('.') && !fileName.startsWith('/api')) {
    const indexPath = path.join(publicPath, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexContent);
  }
  
  res.status(404).json({ error: 'Not found' });
};
