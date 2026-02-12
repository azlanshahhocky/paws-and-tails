# 🚀 Quick Start Guide - Paws & Tails Admin Panel

## ✅ Setup Complete!

Your admin panel is now ready to use. The server is running on port 3000.

### 📍 Access Your Admin Panel

**Admin Login:** http://localhost:3000/admin

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

### 🎯 How to Post Your First Article

1. **Login to Admin Panel**
   - Go to http://localhost:3000/admin
   - Enter your credentials
   - You'll be redirected to the dashboard

2. **Create New Article**
   - Click the green "**+ New Article**" button
   - Fill in the form:
     ```
     Title: "Golden Retriever Training Tips"
     Excerpt: "Learn essential training techniques for your Golden Retriever puppy"
     Content: "Write your article content here (supports HTML formatting)"
     ```
   
3. **Upload Image** (Optional)
   - Click "Choose Image"
   - Select an image from your computer
   - Preview will show automatically
   - Images are saved to `/images/` folder

4. **SEO Settings** (Recommended)
   - Meta Description: "Complete guide to training Golden Retrievers"
   - Meta Keywords: "golden retriever, dog training, puppy, pet care"
   - Author: "Paws & Tails"

5. **Publish**
   - Click "**Publish Article**"
   - System automatically:
     - ✅ Generates permalink: `/articles/golden-retriever-training-tips.html`
     - ✅ Creates HTML file in `articles/` folder
     - ✅ Updates `sitemap.xml`
     - ✅ Notifies Google for indexing

### 📁 Where Your Articles Are Saved

- **HTML Files:** `/workspaces/paws-and-tails/articles/[slug].html`
- **Images:** `/workspaces/paws-and-tails/images/[filename]`
- **Database:** `/workspaces/paws-and-tails/database.db`

### 🌐 Accessing Published Articles

After publishing, your articles are available at:
```
http://localhost:3000/articles/[article-slug].html
```

Example:
```
http://localhost:3000/articles/golden-retriever-training-tips.html
```

For production:
```
https://pawsanadtails.site/articles/golden-retriever-training-tips.html
```

### 📝 Article URL Structure

The system automatically generates SEO-friendly URLs:
- **Title:** "Golden Retriever Training Tips"
- **Generated URL:** `golden-retriever-training-tips.html`

All special characters are removed and spaces become hyphens.

### 🔄 Managing Existing Articles

**Edit Article:**
1. Find article in dashboard table
2. Click "**Edit**" button
3. Make changes
4. Click "**Update Article**"

**Delete Article:**
1. Find article in dashboard
2. Click "**Delete**" button
3. Confirm deletion
4. System removes HTML file, image, and database entry

### 🗺️ Sitemap & Google Indexing

**Automatic Updates:**
- Sitemap updates on every article publish/edit/delete
- Google is notified via ping
- View sitemap: http://localhost:3000/sitemap.xml

**Manual Google Submission:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://pawsanadtails.site`
3. Submit sitemap: `https://pawsanadtails.site/sitemap.xml`

### 📱 Dashboard Features

- **Statistics Cards:** Total articles and published count
- **Articles Table:** View all articles with actions
- **Search & Filter:** Find articles quickly
- **Responsive Design:** Works on mobile and desktop

### 🔐 Security Tips

⚠️ **Before Going Live:**

1. **Change Admin Password**
   - Edit `.env` file
   - Update `ADMIN_PASSWORD=your-secure-password`
   - Restart server

2. **Change JWT Secret**
   - Generate new secret:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - Update in `.env`: `JWT_SECRET=your-generated-secret`

3. **Update Website URL**
   - Edit `.env`
   - Set `WEBSITE_URL=https://pawsanadtails.site`

### 🖼️ Image Requirements

- **Formats:** JPEG, PNG, GIF, WebP
- **Max Size:** 5MB
- **Recommendations:**
  - Width: 800-1200px
  - Optimize before upload
  - Use descriptive filenames

### 🛠️ Server Commands

**Start Server:**
```bash
cd /workspaces/paws-and-tails
npm start
```

**Start with Auto-Reload (Development):**
```bash
npm run dev
```

**Stop Server:**
```bash
# Find process ID
ps aux | grep "node server.js"

# Kill process
kill [PID]
```

### 📊 Database Management

**View All Articles:**
```bash
sqlite3 database.db "SELECT id, title, slug, created_at FROM articles;"
```

**Check Database:**
```bash
sqlite3 database.db ".tables"
sqlite3 database.db ".schema articles"
```

### 🐛 Troubleshooting

**Can't Login?**
- Check `.env` file for correct credentials
- Clear browser cache and cookies
- Verify server is running: `ps aux | grep node`

**Images Not Uploading?**
- Check `images/` folder exists and is writable
- Verify file size under 5MB
- Check supported formats (JPEG, PNG, GIF, WebP)

**Articles Not Showing?**
- Check `articles/` folder for HTML files
- Verify database entry exists
- Check browser console for errors

**Google Not Indexing?**
- Allow 24-48 hours for crawling
- Submit sitemap manually in Google Search Console
- Verify robots.txt allows crawling

### 🚀 Production Deployment

When deploying to production:

1. **Set Environment Variables**
   ```env
   PORT=3000
   WEBSITE_URL=https://pawsanadtails.site
   ADMIN_USERNAME=your-admin
   ADMIN_PASSWORD=strong-password-here
   JWT_SECRET=generated-secret-key
   ```

2. **Use Process Manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name paws-admin
   pm2 save
   pm2 startup
   ```

3. **Set Up Nginx Reverse Proxy**
   ```nginx
   location /admin {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

4. **Enable SSL/HTTPS**
   ```bash
   sudo certbot --nginx -d pawsanadtails.site
   ```

### 📞 Need Help?

Check these files for more information:
- **Full Documentation:** [README.md](README.md)
- **Environment Config:** `.env`
- **Server Logs:** Check terminal where server is running

### 🎉 You're All Set!

Your admin panel is ready to use. Start creating amazing content for Paws & Tails!

---

**Quick Links:**
- 🔐 Admin Panel: http://localhost:3000/admin
- 🏠 Website: http://localhost:3000/index.html
- 🗺️ Sitemap: http://localhost:3000/sitemap.xml

Happy Publishing! 🐾
