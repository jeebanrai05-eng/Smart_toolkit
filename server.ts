import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database setup
  const db = new Database("toolkit.db");
  
  // Initialize tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      color TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  app.use(express.json());

  // API Routes
  app.get("/api/history", (req, res) => {
    const rows = db.prepare("SELECT * FROM history ORDER BY timestamp DESC").all();
    res.json(rows);
  });

  app.post("/api/history", (req, res) => {
    const { type, title, content } = req.body;
    const info = db.prepare("INSERT INTO history (type, title, content) VALUES (?, ?, ?)").run(type, title, content);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/history/:id", (req, res) => {
    db.prepare("DELETE FROM history WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/notes", (req, res) => {
    const rows = db.prepare("SELECT * FROM notes ORDER BY timestamp DESC").all();
    res.json(rows);
  });

  app.post("/api/notes", (req, res) => {
    const { title, content, color } = req.body;
    const info = db.prepare("INSERT INTO notes (title, content, color) VALUES (?, ?, ?)").run(title, content, color);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/notes/:id", (req, res) => {
    db.prepare("DELETE FROM notes WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smart Utility Toolkit Pro running on http://localhost:${PORT}`);
  });
}

startServer();
