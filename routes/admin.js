const express = require('express');
const router = express.Router();
const db = require('../database');
const authenticateToken = require('../middleware/auth');

// Get dashboard statistics
router.get('/stats', authenticateToken, (req, res) => {
    db.get('SELECT COUNT(*) as total FROM articles', [], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        db.get('SELECT COUNT(*) as published FROM articles WHERE published = 1', [], (err2, result2) => {
            if (err2) {
                return res.status(500).json({ error: err2.message });
            }
            
            res.json({
                totalArticles: result.total,
                publishedArticles: result2.published
            });
        });
    });
});

module.exports = router;
