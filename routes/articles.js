const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');
const db = require('../database');
const authenticateToken = require('../middleware/auth');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../images');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Get all articles
router.get('/', (req, res) => {
    db.all('SELECT * FROM articles ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ articles: rows });
    });
});

// Get single article by slug
router.get('/:slug', (req, res) => {
    db.get('SELECT * FROM articles WHERE slug = ?', [req.params.slug], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ article: row });
    });
});

// Create new article
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
    const { title, content, excerpt, meta_description, meta_keywords, author } = req.body;
    
    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });
    
    // Get image URL if uploaded
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;

    const sql = `INSERT INTO articles (title, slug, content, excerpt, image_url, meta_description, meta_keywords, author) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [title, slug, content, excerpt, imageUrl, meta_description, meta_keywords, author || 'Paws & Tails'], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        const articleId = this.lastID;
        
        // Generate HTML file for the article
        generateArticleHTML(articleId, { id: articleId, title, slug, content, excerpt, image_url: imageUrl, meta_description, meta_keywords, author: author || 'Paws & Tails' });
        
        // Update sitemap
        updateSitemap();
        
        // Notify Google for indexing
        notifyGoogleIndexing(slug);
        
        res.json({ 
            success: true, 
            articleId, 
            slug,
            message: 'Article created successfully',
            permalink: `${process.env.WEBSITE_URL}/articles/${slug}.html`
        });
    });
});

// Update article
router.put('/:id', authenticateToken, upload.single('image'), (req, res) => {
    const { title, content, excerpt, meta_description, meta_keywords, author } = req.body;
    const articleId = req.params.id;
    
    // Generate new slug if title changed
    const slug = slugify(title, { lower: true, strict: true });
    
    // Get existing article to check for old image
    db.get('SELECT * FROM articles WHERE id = ?', [articleId], (err, article) => {
        if (err || !article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        
        let imageUrl = article.image_url;
        
        // If new image uploaded, delete old one and use new
        if (req.file) {
            if (article.image_url) {
                const oldImagePath = path.join(__dirname, '..', article.image_url);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imageUrl = `/images/${req.file.filename}`;
        }
        
        const sql = `UPDATE articles 
                     SET title = ?, slug = ?, content = ?, excerpt = ?, image_url = ?, 
                         meta_description = ?, meta_keywords = ?, author = ?, updated_at = CURRENT_TIMESTAMP
                     WHERE id = ?`;
        
        db.run(sql, [title, slug, content, excerpt, imageUrl, meta_description, meta_keywords, author || 'Paws & Tails', articleId], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            // Regenerate HTML file
            generateArticleHTML(articleId, { id: articleId, title, slug, content, excerpt, image_url: imageUrl, meta_description, meta_keywords, author: author || 'Paws & Tails' });
            
            // Update sitemap
            updateSitemap();
            
            res.json({ 
                success: true, 
                message: 'Article updated successfully',
                permalink: `${process.env.WEBSITE_URL}/articles/${slug}.html`
            });
        });
    });
});

// Delete article
router.delete('/:id', authenticateToken, (req, res) => {
    const articleId = req.params.id;
    
    // Get article to delete associated files
    db.get('SELECT * FROM articles WHERE id = ?', [articleId], (err, article) => {
        if (err || !article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        
        // Delete image if exists
        if (article.image_url) {
            const imagePath = path.join(__dirname, '..', article.image_url);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        // Delete HTML file
        const htmlPath = path.join(__dirname, '../articles', `${article.slug}.html`);
        if (fs.existsSync(htmlPath)) {
            fs.unlinkSync(htmlPath);
        }
        
        // Delete from database
        db.run('DELETE FROM articles WHERE id = ?', [articleId], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            // Update sitemap
            updateSitemap();
            
            res.json({ success: true, message: 'Article deleted successfully' });
        });
    });
});

// Function to generate HTML file for article
function generateArticleHTML(articleId, article) {
    const template = `
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${article.meta_description || article.excerpt || article.title}">
    <meta name="keywords" content="${article.meta_keywords || 'puppies, dogs, pet care'}">
    <meta name="author" content="${article.author}">
    <title>${article.title} - Paws & Tails</title>
    <style>
        /* Light Theme Variables */
        :root {
            --background: #f9f9f9;
            --text-color: #333;
            --header-background: #4caf50;
            --header-text-color: white;
            --footer-background: #333;
            --footer-text-color: white;
            --article-background: white;
            --heading-color: #333;
        }

        /* Dark Theme Variables */
        [data-theme="dark"] {
            --background: #333;
            --text-color: #f9f9f9;
            --header-background: #222;
            --header-text-color: #f9f9f9;
            --footer-background: #222;
            --footer-text-color: #f9f9f9;
            --article-background: #444;
            --heading-color: #f9f9f9;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
            background-color: var(--background);
            color: var(--text-color);
        }

        header, footer {
            background-color: var(--header-background);
            color: var(--header-text-color);
            padding: 10px 0;
            text-align: center;
        }

        footer {
            background-color: var(--footer-background);
            color: var(--footer-text-color);
        }

        nav ul {
            list-style: none;
            padding: 0;
        }

        nav ul li {
            display: inline;
            margin: 0 10px;
        }

        nav ul li a {
            color: var(--header-text-color);
            text-decoration: none;
        }

        article {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: var(--article-background);
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        article h1 {
            color: var(--heading-color);
            margin-bottom: 10px;
        }

        article img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 20px 0;
        }

        .article-meta {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 20px;
        }

        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--header-background);
            color: var(--header-text-color);
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }

        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #4caf50;
            text-decoration: none;
        }

        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <button class="theme-toggle" onclick="toggleTheme()">Toggle Dark Mode</button>
    
    <header>
        <h1>Paws & Tails</h1>
        <nav>
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../services.html">Services</a></li>
                <li><a href="../buy-sell.html">Buy/Sell</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <article>
        <h1>${article.title}</h1>
        <div class="article-meta">
            By ${article.author} | ${new Date().toLocaleDateString()}
        </div>
        ${article.image_url ? `<img src="..${article.image_url}" alt="${article.title}">` : ''}
        <div class="content">
            ${article.content}
        </div>
        <a href="../index.html" class="back-link">← Back to Home</a>
    </article>

    <footer>
        <p>&copy; 2026 Paws & Tails. All rights reserved.</p>
    </footer>

    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    </script>
</body>
</html>`;

    const filePath = path.join(__dirname, '../articles', `${article.slug}.html`);
    fs.writeFileSync(filePath, template);
}

// Function to update sitemap.xml
function updateSitemap() {
    db.all('SELECT slug, updated_at FROM articles WHERE published = 1', [], (err, articles) => {
        if (err) {
            console.error('Error fetching articles for sitemap:', err);
            return;
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
\t\t<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
\t<loc>${process.env.WEBSITE_URL}/</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${process.env.WEBSITE_URL}/index.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${process.env.WEBSITE_URL}/about.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${process.env.WEBSITE_URL}/services.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${process.env.WEBSITE_URL}/buy-sell.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${process.env.WEBSITE_URL}/contact.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
`;

        articles.forEach(article => {
            const lastmod = article.updated_at ? new Date(article.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
            sitemap += `<url>
\t<loc>${process.env.WEBSITE_URL}/articles/${article.slug}.html</loc>
\t<lastmod>${lastmod}T09:26:05+01:00</lastmod>
\t<priority>0.8</priority>
</url>
`;
        });

        sitemap += `</urlset>`;

        const sitemapPath = path.join(__dirname, '../sitemap.xml');
        fs.writeFileSync(sitemapPath, sitemap);
        console.log('Sitemap updated successfully');
    });
}

// Function to notify Google for indexing
function notifyGoogleIndexing(slug) {
    const axios = require('axios');
    const url = `${process.env.WEBSITE_URL}/articles/${slug}.html`;
    
    // Ping Google to crawl the new URL
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(process.env.WEBSITE_URL + '/sitemap.xml')}`;
    
    axios.get(googlePingUrl)
        .then(() => {
            console.log(`Google notified about new article: ${url}`);
        })
        .catch(err => {
            console.error('Error notifying Google:', err.message);
        });
}

module.exports = router;
