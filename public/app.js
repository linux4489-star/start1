// Configuration
const API_BASE = window.location.origin || 'http://localhost:3000';
let currentVideoId = null;
let allVideos = [];
let currentUser = null;
let authToken = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    loadVideos();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Upload form
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }

    // File drag and drop
    const fileUploadArea = document.querySelector('.file-upload-area');
    if (fileUploadArea) {
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.style.backgroundColor = '#e8e8e8';
        });

        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.style.backgroundColor = '#f9f9f9';
        });

        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.style.backgroundColor = '#f9f9f9';
            const files = e.dataTransfer.files;
            document.getElementById('movieFile').files = files;
        });
    }

    // File input change
    const movieFile = document.getElementById('movieFile');
    if (movieFile) {
        movieFile.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || 'No file selected';
            const fileUploadArea = document.querySelector('.file-upload-area p');
            if (fileUploadArea) {
                fileUploadArea.textContent = fileName;
            }
        });
    }
}

// Authentication Functions

function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (token) {
        authToken = token;
        fetchCurrentUser();
    } else {
        updateAuthUI(false);
    }
}

async function fetchCurrentUser() {
    try {
        const response = await fetch(`${API_BASE}/api/user`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            updateAuthUI(true);
        } else {
            localStorage.removeItem('authToken');
            authToken = null;
            updateAuthUI(false);
        }
    } catch (error) {
        console.error('Error checking user:', error);
    }
}

function updateAuthUI(isLoggedIn) {
    const loginLink = document.getElementById('loginLink');
    const uploadLink = document.getElementById('uploadLink');
    const libraryLink = document.getElementById('libraryLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const userMenu = document.getElementById('userMenu');

    if (isLoggedIn && currentUser) {
        loginLink.style.display = 'none';
        uploadLink.style.display = 'block';
        libraryLink.style.display = 'block';
        logoutBtn.style.display = 'block';
        userMenu.textContent = `👤 ${currentUser.username}`;
        userMenu.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        uploadLink.style.display = 'none';
        libraryLink.style.display = 'none';
        logoutBtn.style.display = 'none';
        userMenu.style.display = 'none';
    }
}

function switchAuthTab(formId) {
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(formId).classList.add('active');
    
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            updateAuthUI(true);
            showStatus('Login successful!', 'success');
            setTimeout(() => showPage('home'), 1500);
        } else {
            document.getElementById('loginError').textContent = data.error || 'Login failed';
        }
    } catch (error) {
        document.getElementById('loginError').textContent = 'Error: ' + error.message;
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    try {
        const response = await fetch(`${API_BASE}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, confirmPassword })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            updateAuthUI(true);
            showStatus('Account created successfully!', 'success');
            setTimeout(() => showPage('home'), 1500);
        } else {
            document.getElementById('signupError').textContent = data.error || 'Signup failed';
        }
    } catch (error) {
        document.getElementById('signupError').textContent = 'Error: ' + error.message;
    }
}

function logout() {
    localStorage.removeItem('authToken');
    authToken = null;
    currentUser = null;
    updateAuthUI(false);
    showStatus('Logged out successfully', 'success');
    setTimeout(() => showPage('home'), 1000);
}

// Load Videos
async function loadVideos() {
    try {
        const response = await fetch(`${API_BASE}/api/videos`);
        allVideos = await response.json();
        displayVideos(allVideos);
    } catch (error) {
        console.error('Error loading videos:', error);
        document.getElementById('videosList').innerHTML = 
            '<div class="empty-message">Error loading videos. Please refresh the page.</div>';
    }
}

// Display Videos
function displayVideos(videos) {
    const container = document.getElementById('videosList');
    if (!container) return;

    if (videos.length === 0) {
        container.innerHTML = '<div class="empty-message">No movies available</div>';
        return;
    }

    container.innerHTML = videos.map(video => `
        <div class="video-card" onclick="playVideo('${video.id}')">
            <div class="video-thumbnail">
                <i class="fas fa-film"></i>
            </div>
            <div class="video-info-card">
                <h3>${escapeHtml(video.title)}</h3>
                <p>${formatDate(video.uploadDate)}</p>
            </div>
        </div>
    `).join('');

    // Update library
    updateLibrary();
}

// Search Videos
function searchVideos() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allVideos.filter(video => 
        video.title.toLowerCase().includes(query)
    );
    displayVideos(filtered);
}

// Handle Upload
async function handleUpload(e) {
    e.preventDefault();

    if (!authToken) {
        showStatus('Please login to upload videos', 'error');
        showPage('login');
        return;
    }

    const title = document.getElementById('movieTitle').value.trim();
    const file = document.getElementById('movieFile').files[0];
    const duration = document.getElementById('movieDuration').value;

    if (!title) {
        showStatus('Please enter a movie title', 'error');
        return;
    }

    if (!file) {
        showStatus('Please select a file', 'error');
        return;
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
        showStatus('Please select a valid video file', 'error');
        return;
    }

    if (file.size > 5 * 1024 * 1024 * 1024) {
        showStatus('File size exceeds 5GB limit', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', file);
    formData.append('duration', duration);

    try {
        showStatus('Uploading...', '');
        document.getElementById('uploadProgress').style.display = 'block';

        const xhr = new XMLHttpRequest();

        // Progress tracking
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                document.getElementById('progressFill').style.width = percentComplete + '%';
                showStatus(`Uploading: ${Math.round(percentComplete)}%`, '');
            }
        });

        xhr.addEventListener('load', async () => {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        showStatus('Upload successful! Redirecting...', 'success');
                        document.getElementById('uploadForm').reset();
                        document.getElementById('uploadProgress').style.display = 'none';
                        document.getElementById('progressFill').style.width = '0%';
                        document.querySelector('.file-upload-area p').textContent = 
                            'Click to upload or drag and drop';
                        
                        // Reload videos after 1 second
                        setTimeout(loadVideos, 1000);
                        setTimeout(() => showPage('home'), 2000);
                    } else {
                        showStatus('Upload failed: ' + (response.error || 'Unknown error'), 'error');
                    }
                } catch (e) {
                    showStatus('Upload successful!', 'success');
                    setTimeout(loadVideos, 1000);
                    setTimeout(() => showPage('home'), 2000);
                }
            } else if (xhr.status === 413) {
                showStatus('File too large. Max 5GB.', 'error');
            } else if (xhr.status === 400) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    showStatus('Upload failed: ' + (response.error || 'Bad request'), 'error');
                } catch (e) {
                    showStatus('Upload failed: Invalid file or request', 'error');
                }
            } else {
                showStatus('Upload failed: Server error (' + xhr.status + ')', 'error');
            }
            document.getElementById('uploadProgress').style.display = 'none';
        });

        xhr.addEventListener('error', () => {
            showStatus('Upload error: Network problem. Check server is running.', 'error');
            document.getElementById('uploadProgress').style.display = 'none';
        });

        xhr.addEventListener('abort', () => {
            showStatus('Upload cancelled', 'error');
            document.getElementById('uploadProgress').style.display = 'none';
        });

        xhr.open('POST', `${API_BASE}/api/upload`);
        xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
        xhr.send(formData);

    } catch (error) {
        showStatus('Error: ' + error.message, 'error');
        document.getElementById('uploadProgress').style.display = 'none';
    }
}

// Play Video
function playVideo(videoId) {
    const video = allVideos.find(v => v.id === videoId);
    if (!video) return;

    currentVideoId = videoId;
    document.getElementById('videoPlayer').src = video.filepath || 
        `${API_BASE}/uploads/videos/${video.filename}`;
    document.getElementById('playerTitle').textContent = escapeHtml(video.title);
    document.getElementById('playerDate').textContent = 
        `Uploaded: ${formatDate(video.uploadDate)}`;
    
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.style.display = 'block';

    document.getElementById('playerModal').style.display = 'flex';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close Player
function closePlayer() {
    document.getElementById('playerModal').style.display = 'none';
    document.getElementById('videoPlayer').pause();
    document.getElementById('videoPlayer').src = '';
    currentVideoId = null;
    document.body.style.overflow = 'auto';
}

// Delete Video
async function deleteVideo() {
    if (!currentVideoId) return;

    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
        const response = await fetch(`${API_BASE}/api/videos/${currentVideoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            closePlayer();
            showStatus('Video deleted successfully', 'success');
            setTimeout(loadVideos, 500);
        } else {
            showStatus('Failed to delete video', 'error');
        }
    } catch (error) {
        showStatus('Error: ' + error.message, 'error');
    }
}

// Show Page
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const page = document.getElementById(pageName);
    if (page) {
        page.classList.add('active');
    }

    // Update nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target?.classList.add('active');
}

// Update Library
function updateLibrary() {
    const libraryList = document.getElementById('libraryList');
    if (!libraryList) return;

    if (allVideos.length === 0) {
        libraryList.innerHTML = '<p class="empty-message">No videos uploaded yet</p>';
        return;
    }

    libraryList.innerHTML = allVideos.map(video => `
        <div class="video-card" onclick="playVideo('${video.id}')">
            <div class="video-thumbnail">
                <i class="fas fa-film"></i>
            </div>
            <div class="video-info-card">
                <h3>${escapeHtml(video.title)}</h3>
                <p>${formatDate(video.uploadDate)}</p>
            </div>
        </div>
    `).join('');
}

// Utility Functions
function showStatus(message, type) {
    const statusEl = document.getElementById('uploadStatus');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = 'upload-status';
        if (type) {
            statusEl.classList.add(type);
        }
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('playerModal');
    if (e.target === modal) {
        closePlayer();
    }
});
