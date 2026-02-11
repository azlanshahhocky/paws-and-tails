# 🔐 Admin Panel Credentials

## Login Information

**Admin Panel URL:** http://localhost:3000/admin

**Username:** `admin`

**Password:** `admin123`

---

## Important Security Notes

⚠️ **CRITICAL:** Change these default credentials before deploying to production!

### How to Change Credentials:

1. Open the `.env` file in your project root
2. Update the following values:
   ```env
   ADMIN_USERNAME=your-new-username
   ADMIN_PASSWORD=your-new-secure-password
   JWT_SECRET=your-new-jwt-secret-key
   ```

3. Restart the server:
   ```bash
   pkill -f "node server.js"
   cd /workspaces/paws-and-tails && node server.js
   ```

### Generate a Secure JWT Secret:

Run this command to generate a secure random key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` value in `.env`

---

## Access Points

1. **Direct URL:** http://localhost:3000/admin
2. **From Website:** Click "🔐 Admin Login" in the navigation menu
3. **Blog Page:** http://localhost:3000/blog.html

---

## What You Can Do in Admin Panel

✅ Create new articles with rich content
✅ Upload featured images
✅ Edit existing articles
✅ Delete articles
✅ SEO optimization (meta descriptions, keywords)
✅ Automatic permalink generation
✅ Automatic sitemap updates
✅ Google indexing notifications

---

## Default Configuration (from .env)

```env
PORT=3000
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
WEBSITE_URL=https://pawsanadtails.site
```

---

## Production Deployment Checklist

Before going live:

- [ ] Change ADMIN_USERNAME
- [ ] Change ADMIN_PASSWORD to a strong password
- [ ] Generate and set new JWT_SECRET
- [ ] Update WEBSITE_URL to your production domain
- [ ] Never commit .env file to Git
- [ ] Enable HTTPS/SSL
- [ ] Set up regular database backups

---

## Troubleshooting

**Can't Login?**
- Verify credentials in `.env` file match what you're entering
- Check if server is running: `ps aux | grep "node server.js"`
- Clear browser cache and cookies
- Try in incognito/private browsing mode

**Forgot Password?**
- Check the `.env` file for current password
- Or reset by editing `.env` and restarting the server

---

**Keep this file secure and do not share publicly!**
