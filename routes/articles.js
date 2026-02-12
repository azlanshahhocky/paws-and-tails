const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');
const db = require('../database');
const authenticateToken = require('../middleware/auth');
const { validateContent, sanitizeContent } = require('../utils/contentValidator');
const { renderTemplate, templateExists, getFallbackTemplate, renderTemplateString } = require('../utils/templateEngine');

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
    const status = req.query.status; // 'all', 'published', or 'draft'
    
    let sql = 'SELECT * FROM articles ORDER BY created_at DESC';
    let params = [];
    
    if (status === 'published') {
        sql = 'SELECT * FROM articles WHERE published = 1 ORDER BY created_at DESC';
    } else if (status === 'draft') {
        sql = 'SELECT * FROM articles WHERE published = 0 ORDER BY created_at DESC';
    }
    
    db.all(sql, params, (err, rows) => {
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
    const { title, content, excerpt, meta_description, meta_keywords, author, published } = req.body;
    
    // Validate content
    const validation = validateContent(title, content);
    if (!validation.valid) {
        return res.status(400).json({ 
            error: 'Validation failed', 
            details: validation.errors 
        });
    }
    
    // Sanitize content to prevent XSS
    const sanitizedContent = sanitizeContent(content);
    
    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });
    
    // Get image URL if uploaded
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;
    
    // Parse published field (default to 1 if not provided)
    const publishedValue = published !== undefined ? parseInt(published) : 1;

    const sql = `INSERT INTO articles (title, slug, content, excerpt, image_url, meta_description, meta_keywords, author, published, version_count) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`;
    
    db.run(sql, [title, slug, sanitizedContent, excerpt, imageUrl, meta_description, meta_keywords, author || 'Paws & Tails', publishedValue], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        const articleId = this.lastID;
        
        // Only generate HTML file, update sitemap, and notify Google if published
        if (publishedValue === 1) {
            try {
                generateArticleHTML(articleId, { 
                    id: articleId, 
                    title, 
                    slug, 
                    content: sanitizedContent, 
                    excerpt, 
                    image_url: imageUrl, 
                    meta_description, 
                    meta_keywords, 
                    author: author || 'Paws & Tails',
                    created_at: new Date().toLocaleDateString()
                });
                
                // Create initial version
                createArticleVersion(articleId, {
                    title,
                    content: sanitizedContent,
                    excerpt,
                    image_url: imageUrl,
                    meta_description,
                    meta_keywords,
                    author: author || 'Paws & Tails'
                });
                
                updateSitemap();
                notifyGoogleIndexing(slug);
            } catch (error) {
                // Rollback: delete the article if HTML generation fails
                db.run('DELETE FROM articles WHERE id = ?', [articleId], (rollbackErr) => {
                    if (rollbackErr) {
                        console.error('Rollback failed:', rollbackErr);
                    }
                });
                return res.status(500).json({ 
                    error: 'Failed to generate article HTML',
                    details: error.message 
                });
            }
        }
        
        const message = publishedValue === 1 ? 'Article published successfully' : 'Article saved as draft';
        const responseData = { 
            success: true, 
            articleId, 
            slug,
            message
        };
        
        // Only include permalink for published articles
        if (publishedValue === 1) {
            responseData.permalink = `${process.env.WEBSITE_URL || 'https://pawsanadtails.site'}/articles/${slug}.html`;
        }
        
        res.json(responseData);
    });
});

// Update article
router.put('/:id', authenticateToken, upload.single('image'), (req, res) => {
    const { title, content, excerpt, meta_description, meta_keywords, author, published } = req.body;
    const articleId = req.params.id;
    
    // Validate content
    const validation = validateContent(title, content);
    if (!validation.valid) {
        return res.status(400).json({ 
            error: 'Validation failed', 
            details: validation.errors 
        });
    }
    
    // Sanitize content
    const sanitizedContent = sanitizeContent(content);
    
    // Generate new slug if title changed
    const slug = slugify(title, { lower: true, strict: true });
    
    // Get existing article to check for old image
    db.get('SELECT * FROM articles WHERE id = ?', [articleId], (err, article) => {
        if (err || !article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        
        // Backup current version before update if published
        if (article.published === 1) {
            createArticleVersion(articleId, article);
        }
        
        let imageUrl = article.image_url;
        
        // If new image uploaded, delete old one and use new
        if (req.file) {
            if (article.image_url) {
                const oldImagePath = path.join(__dirname, '..', article.image_url);
                if (fs.existsSync(oldImagePath)) {
                    try {
                        fs.unlinkSync(oldImagePath);
                    } catch (error) {
                        console.error('Error deleting old image:', error);
                    }
                }
            }
            imageUrl = `/images/${req.file.filename}`;
        }
        
        // Parse published field (use existing value if not provided)
        const publishedValue = published !== undefined ? parseInt(published) : article.published;
        const wasPublished = article.published === 1;
        const isNowPublished = publishedValue === 1;
        
        const sql = `UPDATE articles 
                     SET title = ?, slug = ?, content = ?, excerpt = ?, image_url = ?, 
                         meta_description = ?, meta_keywords = ?, author = ?, published = ?, 
                         updated_at = CURRENT_TIMESTAMP, version_count = version_count + 1
                     WHERE id = ?`;
        
        db.run(sql, [title, slug, sanitizedContent, excerpt, imageUrl, meta_description, meta_keywords, author || 'Paws & Tails', publishedValue, articleId], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            // Generate/delete HTML file based on published status
            if (isNowPublished) {
                try {
                    // Delete old HTML if slug changed
                    if (article.slug !== slug && wasPublished) {
                        const oldHtmlPath = path.join(__dirname, '../articles', `${article.slug}.html`);
                        if (fs.existsSync(oldHtmlPath)) {
                            fs.unlinkSync(oldHtmlPath);
                        }
                    }
                    
                    // Generate HTML file if now published
                    generateArticleHTML(articleId, { 
                        id: articleId, 
                        title, 
                        slug, 
                        content: sanitizedContent, 
                        excerpt, 
                        image_url: imageUrl, 
                        meta_description, 
                        meta_keywords, 
                        author: author || 'Paws & Tails',
                        created_at: new Date(article.created_at).toLocaleDateString()
                    });
                    updateSitemap();
                    
                    // Notify Google if newly published
                    if (!wasPublished) {
                        notifyGoogleIndexing(slug);
                    }
                } catch (error) {
                    console.error('Error generating HTML:', error);
                    return res.status(500).json({ 
                        error: 'Failed to generate article HTML',
                        details: error.message 
                    });
                }
            } else if (wasPublished && !isNowPublished) {
                // Delete HTML file if changed from published to draft
                const htmlPath = path.join(__dirname, '../articles', `${slug}.html`);
                if (fs.existsSync(htmlPath)) {
                    try {
                        fs.unlinkSync(htmlPath);
                    } catch (error) {
                        console.error('Error deleting HTML:', error);
                    }
                }
                updateSitemap();
            }
            
            const message = isNowPublished ? 'Article updated and published' : 'Article updated as draft';
            const responseData = {
                success: true, 
                message
            };
            
            // Only include permalink for published articles
            if (isNowPublished) {
                responseData.permalink = `${process.env.WEBSITE_URL || 'https://pawsanadtails.site'}/articles/${slug}.html`;
            }
            
            res.json(responseData);
        });
    });
});

// Auto-save endpoint for drafts
router.post('/autosave/:id', authenticateToken, async (req, res) => {
    const { title, content, excerpt, meta_description, meta_keywords, author } = req.body;
    const articleId = req.params.id;
    
    // Sanitize content
    const sanitizedContent = sanitizeContent(content);
    
    const sql = `UPDATE articles 
                 SET title = ?, content = ?, excerpt = ?, meta_description = ?, meta_keywords = ?, author = ?,
                     last_autosave = CURRENT_TIMESTAMP, draft_updated_at = CURRENT_TIMESTAMP
                 WHERE id = ? AND published = 0`;
    
    db.run(sql, [title, sanitizedContent, excerpt, meta_description, meta_keywords, author, articleId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Draft not found or article is published' });
        }
        
        res.json({ 
            success: true, 
            message: 'Draft auto-saved',
            timestamp: new Date().toLocaleTimeString()
        });
    });
});

// Draft preview endpoint
router.get('/preview/:id', authenticateToken, (req, res) => {
    const articleId = req.params.id;
    
    db.get('SELECT * FROM articles WHERE id = ?', [articleId], (err, article) => {
        if (err || !article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        
        // Generate preview HTML (don't save to file)
        try {
            const previewHTML = generatePreviewHTML(article);
            res.send(previewHTML);
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate preview', details: error.message });
        }
    });
});

// Version history endpoint
router.get('/:id/versions', authenticateToken, (req, res) => {
    const articleId = req.params.id;
    
    db.all('SELECT * FROM article_versions WHERE article_id = ? ORDER BY created_at DESC LIMIT 5', 
           [articleId], (err, versions) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ versions, count: versions.length });
    });
});

// Restore version endpoint
router.post('/:id/restore/:versionId', authenticateToken, (req, res) => {
    const { id: articleId, versionId } = req.params;
    
    // Get version
    db.get('SELECT * FROM article_versions WHERE id = ?', [versionId], (err, version) => {
        if (err || !version) {
            return res.status(404).json({ error: 'Version not found' });
        }
        
        // Get current article
        db.get('SELECT * FROM articles WHERE id = ?', [articleId], (err, article) => {
            if (err || !article) {
                return res.status(404).json({ error: 'Article not found' });
            }
            
            // Backup current version before restore
            createArticleVersion(articleId, article);
            
            // Restore
            const sql = `UPDATE articles SET title = ?, content = ?, excerpt = ?, 
                         image_url = ?, meta_description = ?, meta_keywords = ?, author = ?,
                         updated_at = CURRENT_TIMESTAMP, version_count = version_count + 1
                         WHERE id = ?`;
            
            db.run(sql, [version.title, version.content, version.excerpt, 
                        version.image_url, version.meta_description, 
                        version.meta_keywords, version.author, articleId], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                
                // Regenerate HTML if published
                if (article.published === 1) {
                    try {
                        const slug = slugify(version.title, { lower: true, strict: true });
                        
                        // Delete old HTML if slug changed
                        if (article.slug !== slug) {
                            const oldHtmlPath = path.join(__dirname, '../articles', `${article.slug}.html`);
                            if (fs.existsSync(oldHtmlPath)) {
                                fs.unlinkSync(oldHtmlPath);
                            }
                        }
                        
                        // Update slug in database
                        db.run('UPDATE articles SET slug = ? WHERE id = ?', [slug, articleId]);
                        
                        generateArticleHTML(articleId, {
                            id: articleId,
                            title: version.title,
                            slug: slug,
                            content: version.content,
                            excerpt: version.excerpt,
                            image_url: version.image_url,
                            meta_description: version.meta_description,
                            meta_keywords: version.meta_keywords,
                            author: version.author,
                            created_at: new Date(article.created_at).toLocaleDateString()
                        });
                        updateSitemap();
                    } catch (error) {
                        console.error('Error regenerating HTML:', error);
                        return res.status(500).json({ 
                            error: 'Version restored but HTML regeneration failed',
                            details: error.message 
                        });
                    }
                }
                
                res.json({ success: true, message: 'Version restored successfully' });
            });
        });
    });
});

// Integrity check endpoint
router.get('/admin/integrity-check', authenticateToken, (req, res) => {
    const issues = [];
    
    // Check for published articles without HTML files
    db.all('SELECT * FROM articles WHERE published = 1', [], (err, articles) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        articles.forEach(article => {
            const htmlPath = path.join(__dirname, '../articles', `${article.slug}.html`);
            if (!fs.existsSync(htmlPath)) {
                issues.push({
                    type: 'missing_html',
                    article_id: article.id,
                    slug: article.slug,
                    title: article.title
                });
            }
        });
        
        // Check for orphaned HTML files
        const articlesDir = path.join(__dirname, '../articles');
        if (fs.existsSync(articlesDir)) {
            const htmlFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));
            
            let checkedCount = 0;
            htmlFiles.forEach(file => {
                const slug = file.replace('.html', '');
                db.get('SELECT * FROM articles WHERE slug = ?', [slug], (err, article) => {
                    if (!article && !err) {
                        issues.push({
                            type: 'orphaned_html',
                            file: file,
                            slug: slug
                        });
                    }
                    
                    checkedCount++;
                    if (checkedCount === htmlFiles.length) {
                        res.json({ issues, total: issues.length });
                    }
                });
            });
            
            if (htmlFiles.length === 0) {
                res.json({ issues, total: issues.length });
            }
        } else {
            res.json({ issues, total: issues.length });
        }
    });
});

// Regenerate HTML for article (for fixing missing HTML)
router.post('/:id/regenerate', authenticateToken, (req, res) => {
    const articleId = req.params.id;
    
    db.get('SELECT * FROM articles WHERE id = ? AND published = 1', [articleId], (err, article) => {
        if (err || !article) {
            return res.status(404).json({ error: 'Published article not found' });
        }
        
        try {
            generateArticleHTML(articleId, {
                ...article,
                created_at: new Date(article.created_at).toLocaleDateString()
            });
            res.json({ success: true, message: 'HTML regenerated successfully' });
        } catch (error) {
            res.status(500).json({ 
                error: 'Failed to regenerate HTML',
                details: error.message 
            });
        }
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
    const templatePath = path.join(__dirname, '../templates/article-template.html');
    
    // Prepare template data
    const templateData = {
        title: article.title || '',
        content: article.content || '',
        author: article.author || 'Paws & Tails',
        created_at: article.created_at || new Date().toLocaleDateString(),
        meta_description: article.meta_description || article.excerpt || article.title || '',
        meta_keywords: article.meta_keywords || 'puppies, dogs, pet care',
        featured_image: article.image_url ? `<img src="..${article.image_url}" alt="${article.title}">` : ''
    };
    
    let htmlContent;
    
    // Try to use template file, fall back to inline template if not found
    if (templateExists(templatePath)) {
        try {
            htmlContent = renderTemplate(templatePath, templateData);
        } catch (error) {
            console.error('Template rendering error, using fallback:', error);
            const fallbackTemplate = getFallbackTemplate();
            htmlContent = renderTemplateString(fallbackTemplate, templateData);
        }
    } else {
        console.warn('Template file not found, using fallback template');
        const fallbackTemplate = getFallbackTemplate();
        htmlContent = renderTemplateString(fallbackTemplate, templateData);
    }
    
    // Write HTML file
    const filePath = path.join(__dirname, '../articles', `${article.slug}.html`);
    fs.writeFileSync(filePath, htmlContent);
}

// Function to generate preview HTML (not saved to file)
function generatePreviewHTML(article) {
    const templatePath = path.join(__dirname, '../templates/article-template.html');
    
    const templateData = {
        title: article.title || '',
        content: article.content || '',
        author: article.author || 'Paws & Tails',
        created_at: article.created_at ? new Date(article.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
        meta_description: article.meta_description || article.excerpt || article.title || '',
        meta_keywords: article.meta_keywords || 'puppies, dogs, pet care',
        featured_image: article.image_url ? `<img src="..${article.image_url}" alt="${article.title}">` : ''
    };
    
    if (templateExists(templatePath)) {
        try {
            return renderTemplate(templatePath, templateData);
        } catch (error) {
            console.error('Preview template error, using fallback:', error);
            const fallbackTemplate = getFallbackTemplate();
            return renderTemplateString(fallbackTemplate, templateData);
        }
    } else {
        const fallbackTemplate = getFallbackTemplate();
        return renderTemplateString(fallbackTemplate, templateData);
    }
}

// Function to create article version (for history)
function createArticleVersion(articleId, article) {
    // Check version count and delete oldest if > 5
    db.get('SELECT COUNT(*) as count FROM article_versions WHERE article_id = ?', [articleId], (err, result) => {
        if (!err && result && result.count >= 5) {
            // Delete oldest version
            db.run(`DELETE FROM article_versions WHERE id IN (
                        SELECT id FROM article_versions WHERE article_id = ? 
                        ORDER BY created_at ASC LIMIT 1
                    )`, [articleId]);
        }
    });
    
    // Get next version number
    db.get('SELECT MAX(version_number) as max_version FROM article_versions WHERE article_id = ?', 
           [articleId], (err, result) => {
        const nextVersion = (result && result.max_version) ? result.max_version + 1 : 1;
        
        const sql = `INSERT INTO article_versions 
                     (article_id, title, content, excerpt, image_url, author, meta_description, meta_keywords, version_number)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        db.run(sql, [
            articleId,
            article.title,
            article.content,
            article.excerpt,
            article.image_url,
            article.author,
            article.meta_description,
            article.meta_keywords,
            nextVersion
        ], (err) => {
            if (err) {
                console.error('Error creating article version:', err);
            } else {
                console.log(`Version ${nextVersion} created for article ${articleId}`);
            }
        });
    });
}

// Function to update sitemap.xml
function updateSitemap() {
    const websiteUrl = process.env.WEBSITE_URL || 'https://pawsanadtails.site';
    
    db.all('SELECT slug, updated_at FROM articles WHERE published = 1', [], (err, articles) => {
        if (err) {
            console.error('Error fetching articles for sitemap:', err);
            return;
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
\t\t<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
\t<loc>${websiteUrl}/</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${websiteUrl}/index.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${websiteUrl}/about.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${websiteUrl}/services.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${websiteUrl}/buy-sell.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
<url>
\t<loc>${websiteUrl}/contact.html</loc>
\t<lastmod>${new Date().toISOString().split('T')[0]}T09:26:05+01:00</lastmod>
\t<priority>1.0</priority>
</url>
`;

        articles.forEach(article => {
            const lastmod = article.updated_at ? new Date(article.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
            sitemap += `<url>
\t<loc>${websiteUrl}/articles/${article.slug}.html</loc>
\t<lastmod>${lastmod}T09:26:05+01:00</lastmod>
\t<priority>0.8</priority>
</url>
`;
        });

        sitemap += `</urlset>`;

        const sitemapPath = path.join(__dirname, '../sitemap.xml');
        try {
            fs.writeFileSync(sitemapPath, sitemap);
            console.log('Sitemap updated successfully');
        } catch (error) {
            console.error('Error writing sitemap:', error);
        }
    });
}

// Function to notify Google for indexing
function notifyGoogleIndexing(slug) {
    const axios = require('axios');
    const websiteUrl = process.env.WEBSITE_URL || 'https://pawsanadtails.site';
    const url = `${websiteUrl}/articles/${slug}.html`;
    
    // Ping Google to crawl the new URL
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(websiteUrl + '/sitemap.xml')}`;
    
    axios.get(googlePingUrl)
        .then(() => {
            console.log(`Google notified about new article: ${url}`);
        })
        .catch(err => {
            // Non-critical error - log but don't fail the request
            console.error('Error notifying Google (non-critical):', err.message);
        });
}

module.exports = router;
