# Paws & Tails - Admin Panel

A complete Content Management System (CMS) for the Paws & Tails website with automatic permalink generation, image upload, and Google indexing.

## Features

✅ **Admin Authentication** - Secure login system with JWT tokens
✅ **Article Management** - Create, edit, and delete articles
✅ **Image Upload** - Upload and manage featured images for articles
✅ **Automatic Permalinks** - SEO-friendly URLs generated automatically from titles
✅ **Sitemap Generation** - Automatic sitemap.xml updates on article publish
✅ **Google Indexing** - Automatic notification to Google when new articles are published
✅ **SEO Optimization** - Meta descriptions, keywords, and structured data
✅ **Responsive Dashboard** - Mobile-friendly admin interface
✅ **Statistics** - Dashboard showing total and published articles

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
   - **Content** (required) - The full article text (supports HTML)
   - **Featured Image** - Upload an image (optional)
   - **Meta Description** - For SEO (appears in search results)
   - **Meta Keywords** - Comma-separated keywords
   - **Author** - Article author name
3. Click "**Publish Article**"

The system will automatically:
- Generate a SEO-friendly permalink (e.g., `/articles/golden-retriever-care.html`)
- Create an HTML file in the `articles/` folder
- Update the `sitemap.xml`
- Notify Google for indexing

### Editing Articles

1. Find the article in the dashboard table
2. Click the "**Edit**" button
3. Make your changes
4. Click "**Update Article**"

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
│   └── dashboard.html      # Admin dashboard
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── articles.js        # Article CRUD operations
│   └── admin.js           # Admin dashboard routes
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── articles/              # Generated article HTML files
├── images/                # Uploaded article images
├── database.js            # SQLite database setup
├── server.js              # Main Express server
├── package.json           # Dependencies
├── .env                   # Configuration (DO NOT COMMIT)
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:slug` - Get single article
- `POST /api/articles` - Create article (requires auth)
- `PUT /api/articles/:id` - Update article (requires auth)
- `DELETE /api/articles/:id` - Delete article (requires auth)

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

## Troubleshooting

### Database Not Creating
- Check write permissions in the project directory
- The database.db file should be created automatically on first run

### Images Not Uploading
- Check that the `images/` directory exists and is writable
- Verify file size is under 5MB
- Only JPEG, PNG, GIF, and WebP are allowed

### Articles Not Appearing
- Check the `articles/` directory for generated HTML files
- Verify database has the article entries: `sqlite3 database.db "SELECT * FROM articles;"`

### Google Not Indexing
- Verify your sitemap.xml is accessible
- Check Google Search Console for errors
- Allow 24-48 hours for Google to crawl new content

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
