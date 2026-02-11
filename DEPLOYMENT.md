# 📋 Deployment Checklist

## Before Going Live

### ✅ Security
- [ ] Change admin username in `.env`
- [ ] Change admin password in `.env`
- [ ] Generate new JWT secret (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Update `.env` with production values
- [ ] Add `.env` to `.gitignore` (already done)
- [ ] Never commit sensitive data to Git

### ✅ Configuration
- [ ] Update `WEBSITE_URL` in `.env` to your production domain
- [ ] Verify `PORT` setting (default: 3000)
- [ ] Configure Google Search Console
- [ ] Set up Google Indexing API (optional but recommended)

### ✅ Server Setup
- [ ] Install Node.js on production server (v14 or higher)
- [ ] Install dependencies: `npm install --production`
- [ ] Install PM2: `npm install -g pm2`
- [ ] Start with PM2: `pm2 start server.js --name paws-admin`
- [ ] Configure PM2 auto-start: `pm2 startup` and `pm2 save`

### ✅ Web Server (Nginx)
- [ ] Install Nginx
- [ ] Configure reverse proxy for admin panel
- [ ] Set up SSL/TLS with Let's Encrypt
- [ ] Configure firewall (allow ports 80, 443)

### ✅ Database
- [ ] Backup `database.db` regularly
- [ ] Set up automated backups
- [ ] Verify file permissions (read/write)

### ✅ File Storage
- [ ] Ensure `images/` directory exists and is writable
- [ ] Ensure `articles/` directory exists and is writable
- [ ] Set up automated backups for images
- [ ] Configure image optimization (optional)

### ✅ Google Integration
- [ ] Submit sitemap to Google Search Console
- [ ] Verify website ownership in Search Console
- [ ] Set up Google Analytics (optional)
- [ ] Configure robots.txt

### ✅ Testing
- [ ] Test login functionality
- [ ] Create a test article
- [ ] Upload a test image
- [ ] Verify article appears on website
- [ ] Check sitemap.xml updates
- [ ] Test edit functionality
- [ ] Test delete functionality
- [ ] Test on mobile devices

### ✅ Performance
- [ ] Enable gzip compression in Nginx
- [ ] Set up CDN for images (optional)
- [ ] Configure caching headers
- [ ] Optimize images before upload

### ✅ Monitoring
- [ ] Set up error logging
- [ ] Configure PM2 monitoring
- [ ] Set up uptime monitoring
- [ ] Configure email alerts for errors

### ✅ Documentation
- [ ] Document admin login credentials (securely)
- [ ] Create backup/restore procedures
- [ ] Document deployment process
- [ ] Train content editors

## Production Nginx Configuration

Create `/etc/nginx/sites-available/paws-admin`:

```nginx
server {
    listen 80;
    server_name pawsanadtails.site www.pawsanadtails.site;

    # Static files
    root /var/www/paws-and-tails;
    index index.html;

    # Main website
    location / {
        try_files $uri $uri/ =404;
    }

    # Admin panel API and pages
    location /admin {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Enable gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/paws-admin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Enable SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d pawsanadtails.site -d www.pawsanadtails.site
sudo systemctl reload nginx
```

## PM2 Production Setup

```bash
# Start application
pm2 start server.js --name paws-admin

# Save PM2 process list
pm2 save

# Configure PM2 to start on boot
pm2 startup

# Monitor logs
pm2 logs paws-admin

# Monitor status
pm2 status
pm2 monit
```

## Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backups/paws-and-tails"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
cp /var/www/paws-and-tails/database.db $BACKUP_DIR/database_$DATE.db

# Backup images
tar -czf $BACKUP_DIR/images_$DATE.tar.gz /var/www/paws-and-tails/images/

# Backup articles
tar -czf $BACKUP_DIR/articles_$DATE.tar.gz /var/www/paws-and-tails/articles/

# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

Make executable and add to cron:
```bash
chmod +x backup.sh
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

## Monitoring Commands

```bash
# Check server status
pm2 status

# View logs
pm2 logs paws-admin

# Monitor resources
pm2 monit

# Restart server
pm2 restart paws-admin

# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Emergency Procedures

### Server Crashed
```bash
pm2 restart paws-admin
pm2 logs --err
```

### Database Corrupted
```bash
# Restore from backup
cp /backups/paws-and-tails/database_YYYYMMDD.db /var/www/paws-and-tails/database.db
pm2 restart paws-admin
```

### Nginx Not Working
```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
```

## Post-Deployment Verification

1. Visit https://pawsanadtails.site
2. Visit https://pawsanadtails.site/admin
3. Login with new credentials
4. Create a test article
5. Verify article appears at correct URL
6. Check sitemap: https://pawsanadtails.site/sitemap.xml
7. Submit sitemap to Google Search Console

## Support Contacts

- **Server Host:** [Your hosting provider]
- **Domain Registrar:** [Your domain provider]
- **SSL Provider:** Let's Encrypt
- **Admin Email:** [Your email]

---

✅ Once all items are checked, your admin panel is ready for production!
