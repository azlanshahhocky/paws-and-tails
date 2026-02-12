/**
 * Content Validation and Sanitization Utilities
 * Ensures content integrity and security before saving/publishing
 */

/**
 * Validates article content for required fields and proper HTML structure
 * @param {string} title - Article title
 * @param {string} content - Article content (HTML)
 * @returns {Object} - { valid: boolean, errors: Array<string> }
 */
function validateContent(title, content) {
    const errors = [];
    
    // Title validation
    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    } else if (title.trim().length < 3) {
        errors.push('Title must be at least 3 characters');
    } else if (title.length > 200) {
        errors.push('Title must be less than 200 characters');
    }
    
    // Content validation
    if (!content || content.trim().length === 0) {
        errors.push('Content is required');
    } else if (content.trim().length < 10) {
        errors.push('Content must be at least 10 characters');
    }
    
    // Check for malformed HTML (unclosed tags)
    if (content) {
        const tagErrors = validateHTMLTags(content);
        if (tagErrors.length > 0) {
            errors.push(...tagErrors);
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * Validates HTML tag structure (checks for unclosed tags)
 * @param {string} html - HTML content to validate
 * @returns {Array<string>} - Array of validation errors
 */
function validateHTMLTags(html) {
    const errors = [];
    const tagStack = [];
    const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr'];
    const htmlTagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    let match;
    
    while ((match = htmlTagRegex.exec(html)) !== null) {
        const tag = match[1].toLowerCase();
        
        // Skip self-closing tags
        if (selfClosingTags.includes(tag)) {
            continue;
        }
        
        if (match[0].startsWith('</')) {
            // Closing tag
            if (tagStack.length === 0) {
                errors.push(`Unexpected closing tag: </${tag}>`);
            } else if (tagStack[tagStack.length - 1] === tag) {
                tagStack.pop();
            } else {
                // Tag mismatch - might be acceptable in HTML5, but we'll warn
                const expected = tagStack[tagStack.length - 1];
                // Some tags can auto-close (like <p> when another <p> starts)
                const autoCloseTags = ['p', 'li', 'td', 'th', 'tr'];
                if (autoCloseTags.includes(expected)) {
                    tagStack.pop();
                    if (tagStack[tagStack.length - 1] === tag) {
                        tagStack.pop();
                    }
                } else {
                    errors.push(`Tag mismatch: expected </${expected}>, found </${tag}>`);
                }
            }
        } else if (!match[0].endsWith('/>')) {
            // Opening tag (not self-closing)
            tagStack.push(tag);
        }
    }
    
    // Check for unclosed tags
    if (tagStack.length > 0) {
        // Only warn for non-optional closing tags
        const optionalCloseTags = ['p', 'li', 'td', 'th', 'tr', 'dt', 'dd'];
        const unclosedRequired = tagStack.filter(tag => !optionalCloseTags.includes(tag));
        if (unclosedRequired.length > 0) {
            errors.push('Unclosed HTML tags detected: ' + unclosedRequired.join(', '));
        }
    }
    
    return errors;
}

/**
 * Sanitizes content to prevent XSS attacks while preserving safe HTML
 * @param {string} content - Content to sanitize
 * @returns {string} - Sanitized content
 */
function sanitizeContent(content) {
    if (!content) return '';
    
    let sanitized = content;
    
    // Remove <script> tags and their contents
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove event handlers (onclick, onerror, etc.)
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
    
    // Remove javascript: protocol from links
    sanitized = sanitized.replace(/href\s*=\s*["']?\s*javascript:/gi, 'href="#"');
    sanitized = sanitized.replace(/src\s*=\s*["']?\s*javascript:/gi, 'src="#"');
    
    // Remove data: protocol from images (except for safe image formats)
    sanitized = sanitized.replace(/src\s*=\s*["']?\s*data:(?!image\/(png|jpg|jpeg|gif|webp|svg\+xml))/gi, 'src="#"');
    
    return sanitized;
}

/**
 * Escapes HTML special characters to prevent XSS when displaying user input
 * @param {string} unsafe - Unsafe string
 * @returns {string} - Escaped string
 */
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Safely extracts text from HTML content (strips all HTML tags)
 * @param {string} html - HTML content
 * @returns {string} - Plain text
 */
function stripHtmlTags(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
}

/**
 * Creates a safe excerpt from content (max length with ellipsis)
 * @param {string} content - Content to excerpt
 * @param {number} maxLength - Maximum length (default: 160)
 * @returns {string} - Safe excerpt
 */
function createExcerpt(content, maxLength = 160) {
    const text = stripHtmlTags(content);
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength - 3).trim() + '...';
}

/**
 * Validates and sanitizes slug for URL safety
 * @param {string} slug - Slug to validate
 * @returns {string} - Safe slug
 */
function sanitizeSlug(slug) {
    if (!slug) return '';
    
    return slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

module.exports = {
    validateContent,
    validateHTMLTags,
    sanitizeContent,
    escapeHtml,
    stripHtmlTags,
    createExcerpt,
    sanitizeSlug
};
