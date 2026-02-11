const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes - try/catch to handle missing files
let authRoutes, articleRoutes, adminRoutes;

try {
    authRoutes = require('../routes/auth');
    articleRoutes = require('../routes/articles');
    adminRoutes = require('../routes/admin');
} catch (error) {
    console.error('Error loading routes:', error);
}

// Serve admin panel HTML directly
app.get('/admin', (req, res) => {
    const fs = require('fs');
    const adminPath = path.join(__dirname, '..', 'admin', 'login.html');
    
    if (fs.existsSync(adminPath)) {
        res.sendFile(adminPath);
    } else {
        res.status(404).send('Admin login page not found');
    }
});

app.get('/admin/dashboard', (req, res) => {
    const fs = require('fs');
    const dashboardPath = path.join(__dirname, '..', 'admin', 'dashboard.html');
    
    if (fs.existsSync(dashboardPath)) {
        res.sendFile(dashboardPath);
    } else {
        res.status(404).send('Dashboard page not found');
    }
});

// API routes (if they loaded successfully)
if (authRoutes) app.use('/api/auth', authRoutes);
if (articleRoutes) app.use('/api/articles', articleRoutes);
if (adminRoutes) app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Export for Vercel
module.exports = app;
