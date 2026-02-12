const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

function initDatabase() {
    // Create articles table
    db.run(`
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            content TEXT NOT NULL,
            excerpt TEXT,
            image_url TEXT,
            author TEXT DEFAULT 'Paws & Tails',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            published BOOLEAN DEFAULT 1,
            meta_description TEXT,
            meta_keywords TEXT,
            draft_updated_at DATETIME,
            last_autosave DATETIME,
            version_count INTEGER DEFAULT 0
        )
    `, (err) => {
        if (err) {
            console.error('Error creating articles table:', err.message);
        } else {
            console.log('Articles table ready');
            // Add new columns to existing table if they don't exist
            addColumnIfNotExists('articles', 'draft_updated_at', 'DATETIME');
            addColumnIfNotExists('articles', 'last_autosave', 'DATETIME');
            addColumnIfNotExists('articles', 'version_count', 'INTEGER DEFAULT 0');
        }
    });

    // Create users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table ready');
        }
    });

    // Create article_versions table for version history
    db.run(`
        CREATE TABLE IF NOT EXISTS article_versions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            article_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            excerpt TEXT,
            image_url TEXT,
            author TEXT,
            meta_description TEXT,
            meta_keywords TEXT,
            version_number INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            created_by TEXT DEFAULT 'admin',
            FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating article_versions table:', err.message);
        } else {
            console.log('Article versions table ready');
        }
    });
}

// Helper function to add column if it doesn't exist
function addColumnIfNotExists(table, column, type) {
    db.all(`PRAGMA table_info(${table})`, [], (err, rows) => {
        if (err) {
            console.error(`Error checking table ${table}:`, err.message);
            return;
        }
        
        const columnExists = rows.some(row => row.name === column);
        if (!columnExists) {
            db.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`, (err) => {
                if (err) {
                    console.error(`Error adding column ${column} to ${table}:`, err.message);
                } else {
                    console.log(`Column ${column} added to ${table}`);
                }
            });
        }
    });
}

module.exports = db;
