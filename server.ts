import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Database
const db = new Database("light_group.db");

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Auth API ---
  app.post("/api/auth/signup", async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
      const result = stmt.run(email, hashedPassword, name);
      res.json({ 
        success: true, 
        user: { id: result.lastInsertRowid, email, name } 
      });
    } catch (error: any) {
      const message = error.message.includes("UNIQUE") ? "Email already exists" : "Signup failed";
      res.status(400).json({ success: false, error: message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
      
      if (user && await bcrypt.compare(password, user.password)) {
        res.json({ 
          success: true, 
          user: { id: user.id, email: user.email, name: user.name } 
        });
      } else {
        res.status(401).json({ success: false, error: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // --- Contact API ---
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
      stmt.run(name, email, message);
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to save message" });
    }
  });

  // --- Vite Middleware ---
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
