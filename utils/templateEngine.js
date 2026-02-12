/**
 * Template Engine for Article HTML Generation
 * Renders article templates with proper variable substitution
 */

const fs = require('fs');
const path = require('path');

/**
 * Renders a template file with provided data
 * @param {string} templatePath - Path to template file
 * @param {Object} data - Data object with variables to substitute
 * @returns {string} - Rendered template
 */
function renderTemplate(templatePath, data) {
    try {
        // Read template file
        let template = fs.readFileSync(templatePath, 'utf8');
        
        // Replace all {{variable}} with actual values
        for (const [key, value] of Object.entries(data)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            const safeValue = value !== null && value !== undefined ? value : '';
            template = template.replace(regex, safeValue);
        }
        
        // Clean up any remaining unreplaced variables (set to empty)
        template = template.replace(/{{[^}]+}}/g, '');
        
        return template;
    } catch (error) {
        console.error('Template rendering error:', error);
        throw new Error(`Failed to render template: ${error.message}`);
    }
}

/**
 * Renders template from string content
 * @param {string} templateString - Template string
 * @param {Object} data - Data object with variables to substitute
 * @returns {string} - Rendered template
 */
function renderTemplateString(templateString, data) {
    let template = templateString;
    
    // Replace all {{variable}} with actual values
    for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        const safeValue = value !== null && value !== undefined ? value : '';
        template = template.replace(regex, safeValue);
    }
    
    // Clean up any remaining unreplaced variables
    template = template.replace(/{{[^}]+}}/g, '');
    
    return template;
}

/**
 * Checks if template file exists
 * @param {string} templatePath - Path to template file
 * @returns {boolean} - True if template exists
 */
function templateExists(templatePath) {
    return fs.existsSync(templatePath);
}

/**
 * Gets fallback inline template if template file doesn't exist
 * @returns {string} - Fallback template HTML
 */
function getFallbackTemplate() {
    return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{meta_description}}">
    <meta name="keywords" content="{{meta_keywords}}">
    <meta name="author" content="{{author}}">
    <title>{{title}} - Paws & Tails</title>
    <style>
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

        /* Code block styling */
        pre {
            background: #f4f4f4;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            overflow-x: auto;
        }

        code {
            font-family: 'Courier New', monospace;
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
        }

        /* Table styling */
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }

        table th, table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        table th {
            background-color: #4caf50;
            color: white;
        }

        /* Video embed styling */
        iframe {
            max-width: 100%;
            margin: 20px 0;
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
        <h1>{{title}}</h1>
        <div class="article-meta">
            By {{author}} | {{created_at}}
        </div>
        {{featured_image}}
        <div class="content">
            {{content}}
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

        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    </script>
</body>
</html>`;
}

module.exports = {
    renderTemplate,
    renderTemplateString,
    templateExists,
    getFallbackTemplate
};
