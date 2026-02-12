# 🚀 Quick Start Guide - Paws & Tails Advanced Publishing System

Get your WordPress-like article publishing system up and running in 5 minutes!

## Prerequisites

- Node.js 14+ installed
- Web browser
- Text editor (optional)

---

## Step 1: Installation (2 minutes)

```bash
# Navigate to project directory
cd paws-and-tails

# Install dependencies (if not already done)
npm install
```

---

## Step 2: Start the Server (30 seconds)

```bash
# Development mode with auto-reload
npm run dev

# OR Production mode
npm start
```

Expected output:
```
Server is running on http://localhost:3000
Admin panel: http://localhost:3000/admin
Connected to SQLite database
Articles table ready
Users table ready
Article versions table ready ✨ NEW!
```

---

## Step 3: Access Admin Panel

1. Open browser → **http://localhost:3000/admin**
2. Login: `admin` / `admin123`
3. Welcome to your dashboard! 🎉

---

## 🆕 New Features Quick Tour

### 1. Auto-Save System ✨
- Edit any draft article
- System saves every 30 seconds automatically
- See: "Draft saved at [time]" indicator
- Refresh page → content restored!

### 2. Version History ✨
- Publish article multiple times
- System keeps last 5 versions
- Click "Version History" to view all
- Restore any previous version

### 3. Draft Preview ✨
- Preview drafts without publishing
- No HTML file created
- Perfect for checking formatting

### 4. Content Preservation ✨
- Special characters: © ® ™ € £
- Emojis: 🐶 🐱 🦊
- Code blocks with syntax highlighting
- HTML tables, video embeds

---

## Common Workflows

### Create Draft with Auto-Save
```
1. Click "+ New Article"
2. Fill in title and content
3. Select "Save as Draft"
4. Auto-save works every 30s
5. Preview anytime
6. Publish when ready
```

### Manage Versions
```
1. Publish article (v1)
2. Edit and publish (v2)
3. Edit and publish (v3)
4. Click "Version History"
5. Restore any version
```

---

## Quick Tests

✓ Create draft → Wait 30s → See auto-save  
✓ Publish article → Check articles/ folder  
✓ Edit published → Click "Version History"  
✓ Test special chars: © ® ™ 🐶  

---

## Need Help?

- **README.md** - Full documentation
- **TESTING.md** - 38 test scenarios
- Check server logs in terminal

---

Made with 🐾 by Paws & Tails
