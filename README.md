# Paws & Tails - Advanced Article Publishing System

A professional-grade Content Management System (CMS) for the Paws & Tails website with WordPress-like features including automatic draft saving, version history, content preservation, and robust publishing workflows.

## ✨ Features

### Core Features
✅ **Admin Authentication** - Secure login system with JWT tokens  
✅ **Article Management** - Create, edit, and delete articles with rich content support  
✅ **Image Upload** - Upload and manage featured images for articles  
✅ **Automatic Permalinks** - SEO-friendly URLs generated automatically from titles  
✅ **Sitemap Generation** - Automatic sitemap.xml updates on article publish  
✅ **Google Indexing** - Automatic notification to Google when new articles are published  
✅ **SEO Optimization** - Meta descriptions, keywords, and structured data  
✅ **Responsive Dashboard** - Mobile-friendly admin interface  
✅ **Statistics** - Dashboard showing total, published, and draft articles  

### 🆕 Advanced Features (NEW!)

#### Draft Management
✅ **Auto-Save System** - Automatic draft saving every 30 seconds  
✅ **Draft Preview** - Preview drafts without publishing  
✅ **Draft Workflow** - Clear distinction between drafts and published articles  
✅ **Status Badges** - Visual indicators for draft/published status  
✅ **Draft Counter** - Track draft count in dashboard  

#### Content Preservation & Validation
✅ **Content Validation** - Validates title, content, and HTML structure before saving  
✅ **XSS Protection** - Sanitizes content to prevent cross-site scripting attacks  
✅ **Special Characters** - Preserves special characters (©, ®, ™, €, £, etc.)  
✅ **Emoji Support** - Full emoji support (🐶, 🐱, etc.)  
✅ **Code Blocks** - Syntax highlighting for code with proper escaping  
✅ **HTML Tables** - Complex table support with nested formatting  
✅ **Video Embeds** - YouTube/Vimeo iframe support  
✅ **Large Content** - Handles 10,000+ word articles efficiently  

#### Version Control & History
✅ **Version History** - Tracks last 5 versions of published articles  
✅ **Version Restore** - Restore any previous version with one click  
✅ **Automatic Versioning** - Creates version on each publish  
✅ **Version Preview** - Preview older versions before restoring  

#### Template System
✅ **Separate Templates** - Article templates in `templates/` directory  
✅ **Template Engine** - Custom template rendering with variable substitution  
✅ **Customizable** - Easy to edit templates without touching code  
✅ **Fallback System** - Automatic fallback if template is missing  

#### Error Handling & Recovery
✅ **Rollback on Failure** - Automatic rollback if HTML generation fails  
✅ **Integrity Check** - System health check for missing/orphaned files  
✅ **Graceful Errors** - User-friendly error messages  
✅ **Data Backup** - Automatic backup before updates  

#### Performance & Security
✅ **SQL Injection Protection** - Parameterized queries throughout  
✅ **Path Traversal Protection** - Sanitized slugs and paths  
✅ **Content Sanitization** - Removes dangerous scripts and event handlers  
✅ **Large Database Support** - Optimized for 1000+ articles  
✅ **Fast Operations** - Draft save < 5s, Publish < 10s  

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file with your settings:

```env
PORT=3000
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
WEBSITE_URL=https://pawsanadtails.site
GOOGLE_INDEXING_API_KEY=your-google-api-key-here
```

**Important:** Change the `ADMIN_USERNAME` and `ADMIN_PASSWORD` before deploying to production!

### 3. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Usage

### Accessing the Admin Panel

1. Open your browser and go to: `http://localhost:3000/admin`
2. Login with your credentials (default: admin/admin123)
3. You'll be redirected to the dashboard

### Creating a New Article

1. Click the "**+ New Article**" button
2. Fill in the article details:
   - **Title** (required) - The article headline
   - **Excerpt** - A short summary for previews
   - **Content** (required) - The full article text with rich formatting
   - **Featured Image** - Upload an image (optional)
   - **Meta Description** - For SEO (appears in search results)
   - **Meta Keywords** - Comma-separated keywords
   - **Author** - Article author name
3. Choose your publishing option:
   - **Publish** - Make article live immediately
   - **Save as Draft** - Save for later (auto-saves every 30 seconds)
4. Click "**Publish Article**" or "**Save as Draft**"

#### Draft Features
- **Auto-Save**: Drafts are automatically saved every 30 seconds while editing
- **Auto-Save Indicator**: Shows "Draft saved at [time]" after each save
- **Preview**: Click "Preview" to see how the article will look without publishing
- **No HTML Generation**: Drafts are stored in database only (no HTML file created)

The system will automatically:
- Generate a SEO-friendly permalink (e.g., `/articles/golden-retriever-care.html`)
- Create an HTML file in the `articles/` folder (published articles only)
- Update the `sitemap.xml`
- Notify Google for indexing (published articles only)
- Create version history entry (published articles only)

### Editing Articles

1. Find the article in the dashboard table
2. Click the "**Edit**" button
3. Make your changes
4. For **published articles**:
   - Click "**Update & Publish**" to save changes and create a new version
   - Click "**Version History**" to view or restore previous versions
5. For **draft articles**:
   - Changes are auto-saved every 30 seconds
   - Click "**Update Draft**" to manually save
   - Click "**Publish**" to make the article live

#### Version History
- System keeps the last 5 versions of published articles
- Click "Version History" button to view all versions
- Preview any version before restoring
- Restore previous versions with one click
- Current version backed up automatically before restore

### Deleting Articles

1. Find the article in the dashboard
2. Click the "**Delete**" button
3. Confirm the deletion

The system will remove:
- The database entry
- The HTML file
- The associated image (if any)
- The entry from sitemap.xml

## File Structure

```
paws-and-tails/
├── admin/
│   ├── login.html          # Admin login page
│   └── dashboard.html      # Admin dashboard with auto-save
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── articles.js        # Article CRUD + versions + auto-save
│   └── admin.js           # Admin dashboard routes
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── utils/                 # NEW: Utility modules
│   ├── contentValidator.js # Content validation & sanitization
│   └── templateEngine.js   # Template rendering system
├── templates/             # NEW: Article templates
│   └── article-template.html # Main article template
├── articles/              # Generated article HTML files
├── images/                # Uploaded article images
├── database.js            # SQLite database setup
├── server.js              # Main Express server
├── package.json           # Dependencies
├── .env                   # Configuration (DO NOT COMMIT)
├── TESTING.md            # Comprehensive test plan (38 tests)
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles?status=published` - Get published articles only
- `GET /api/articles?status=draft` - Get draft articles only
- `GET /api/articles/:slug` - Get single article by slug
- `POST /api/articles` - Create article (requires auth)
- `PUT /api/articles/:id` - Update article (requires auth)
- `DELETE /api/articles/:id` - Delete article (requires auth)

### NEW: Draft & Version Management
- `POST /api/articles/autosave/:id` - Auto-save draft (requires auth)
- `GET /api/articles/preview/:id` - Preview draft without publishing (requires auth)
- `GET /api/articles/:id/versions` - Get version history (requires auth)
- `POST /api/articles/:id/restore/:versionId` - Restore version (requires auth)
- `POST /api/articles/:id/regenerate` - Regenerate HTML file (requires auth)

### NEW: System Health
- `GET /api/articles/admin/integrity-check` - Check for missing/orphaned files (requires auth)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (requires auth)

## Database Schema

### Articles Table
```sql
- id (INTEGER PRIMARY KEY)
- title (TEXT)
- slug (TEXT UNIQUE)
- content (TEXT)
- excerpt (TEXT)
- image_url (TEXT)
- author (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
- published (BOOLEAN)
- meta_description (TEXT)
- meta_keywords (TEXT)
- draft_updated_at (DATETIME)     # NEW
- last_autosave (DATETIME)        # NEW
- version_count (INTEGER)         # NEW
```

### NEW: Article Versions Table
```sql
- id (INTEGER PRIMARY KEY)
- article_id (INTEGER)
- title (TEXT)
- content (TEXT)
- excerpt (TEXT)
- image_url (TEXT)
- author (TEXT)
- meta_description (TEXT)
- meta_keywords (TEXT)
- version_number (INTEGER)
- created_at (DATETIME)
- created_by (TEXT)
```

## Google Indexing Setup

To enable automatic Google indexing:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Verify your website ownership
3. Submit your sitemap: `https://yourdomain.com/sitemap.xml`
4. (Optional) Set up Google Indexing API for real-time updates

The system automatically pings Google when:
- New articles are published
- Articles are updated
- Articles are deleted

## Security Notes

⚠️ **Important Security Considerations:**

1. **Change default credentials** in `.env` before deploying
2. **Use strong JWT secret** - generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. **Use HTTPS** in production
4. **Keep dependencies updated**: `npm update`
5. **Don't commit `.env`** file to version control
6. **Set up rate limiting** for production
7. **Use environment-based authentication** (database) for multiple users

### Built-in Security Features
- ✅ SQL Injection Protection (parameterized queries)
- ✅ XSS Prevention (content sanitization)
- ✅ Path Traversal Protection (slug sanitization)
- ✅ JWT Token Authentication
- ✅ Script Tag Removal
- ✅ Event Handler Removal
- ✅ JavaScript Protocol Blocking

## Testing

A comprehensive test plan with 38 test cases is available in `TESTING.md`. Categories include:

- **Content Preservation** (7 tests) - Special characters, emojis, code blocks, tables, embeds
- **Draft System** (5 tests) - Auto-save, preview, workflow
- **Version History** (4 tests) - Creation, retrieval, restore, limits
- **Publishing Workflow** (4 tests) - Validation, rollback, integrity
- **Error Handling** (5 tests) - Database errors, missing files, conflicts
- **Template System** (3 tests) - Loading, customization, fallback
- **Dashboard UI** (3 tests) - Auto-save indicator, badges, filters
- **Performance** (2 tests) - Large database, large articles
- **Security** (3 tests) - XSS, SQL injection, path traversal
- **Backward Compatibility** (2 tests) - Existing articles, migrations

Run tests manually following the procedures in `TESTING.md`.

## Troubleshooting

### Database Not Creating
- Check write permissions in the project directory
- The database.db file should be created automatically on first run
- Schema updates are applied automatically

### Images Not Uploading
- Check that the `images/` directory exists and is writable
- Verify file size is under 5MB
- Only JPEG, PNG, GIF, and WebP are allowed

### Articles Not Appearing
- Check the `articles/` directory for generated HTML files
- Verify database has the article entries: `sqlite3 database.db "SELECT * FROM articles;"`
- For drafts: No HTML file is generated (this is expected)
- For published articles: HTML should exist in articles/

### Auto-Save Not Working
- Check browser console for errors
- Verify article is saved as draft (published=0)
- Auto-save only works for draft articles
- Wait 30 seconds after making changes

### Version History Missing
- Version history is only available for published articles
- Versions are created when articles are published or updated
- Only last 5 versions are kept

### HTML Generation Failures
- Check articles/ directory permissions
- Run integrity check: GET /api/articles/admin/integrity-check
- Use regenerate endpoint to fix missing HTML files
- Check server logs for detailed errors

### Google Not Indexing
- Verify your sitemap.xml is accessible
- Check Google Search Console for errors
- Allow 24-48 hours for Google to crawl new content
- Google notification failures are non-critical (article still published)

## Development

For development with auto-reload:

```bash
npm install -g nodemon
npm run dev
```

## Production Deployment

1. Update `.env` with production values
2. Change default admin credentials
3. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "paws-admin"
   pm2 save
   pm2 startup
   ```
4. Set up nginx as reverse proxy
5. Enable SSL/TLS with Let's Encrypt

## Support

For issues or questions, please check:
- Server logs: `tail -f /var/log/paws-admin.log`
- Database: `sqlite3 database.db`
- Application logs in terminal where server is running

## License

MIT License - feel free to use and modify for your needs.

---

Made with 🐾 for Paws & Tails
