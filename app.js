const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const app = express();
const PORT = process.env.PORT;
const db = require("./db");
const MySQLStore = require("express-mysql-session")(session);

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);

// Middleware
app.use(express.json());

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306, // Default MySQL port
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "", // Fetch password from .env
  database: process.env.DB_NAME || "quizApp",
});

// Session configuration
app.use(
  session({
    secret: "hsfdhaasbccmklshfaswesrseuskcnk",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 55,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT id FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Database error" });
      } else if (results.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        req.session.userId = results[0].id;
        console.log("Session after login:", req.session);
        req.session.save((err) => {
          if (err) {
            res.status(500).json({ error: "Session save error" });
          } else {
            res.json({
              message: "Login successful",
              userId: req.session.userId, // Send userId back to client
              username,
            });
          }
        });
      }
    }
  );
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};

// Get all quizzes (protected route)
app.get("/getQuiz", isAuthenticated, (req, res) => {
  console.log("Session in getQuiz:", req.session);
  db.query(
    "SELECT title, description, id, updated_at FROM quize WHERE teacher_id = ?",
    [req.session.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database Error" });
      return res.json(results);
    }
  );
});

// Get a single quiz by ID (protected route)
app.get("/getQuiz/:id", isAuthenticated, (req, res) => {
  const quizId = req.params.id; // Extract quiz ID from URL
  console.log("Fetching quiz with ID:", quizId);

  db.query(
    "SELECT title, description, id, updated_at FROM quize WHERE id = ? AND teacher_id = ?",
    [quizId, req.session.userId], // Ensuring the teacher can only access their own quiz
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database Error" });

      if (results.length === 0) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      return res.json(results[0]); // Return the single quiz object
    }
  );
});

// Create a quiz
app.post("/create", isAuthenticated, (req, res) => {
  const { title, description } = req.body;
  const teacherId = req.session.userId; // Get teacher_id from session

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  db.query(
    "INSERT INTO quize (title, description, teacher_id) VALUES (?, ?, ?)",
    [title, description, teacherId],
    (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database Error" });
      }

      return res.status(201).json({
        message: "Quiz created successfully",
        quizId: result.insertId, // Return the inserted quiz ID
      });
    }
  );
});

// Edit a quiz
app.put("/edit/:id", isAuthenticated, (req, res) => {
  const quizId = req.params.id;
  const { title, description } = req.body;
  const teacherId = req.session.userId; // Get teacher_id from session

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  db.query(
    "UPDATE quize SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND teacher_id = ?",
    [title, description, quizId, teacherId],
    (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database Error" });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Quiz not found or unauthorized" });
      }

      return res.json({ message: "Quiz updated successfully" });
    }
  );
});

// delete quiz
app.delete("/delete/:id", isAuthenticated, (req, res) => {
  const quizId = req.params.id;
  const teacherId = req.session.userId; // Get teacher_id from session

  db.query(
    "DELETE FROM quize WHERE id = ? AND teacher_id = ?",
    [quizId, teacherId],
    (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database Error" });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Quiz not found or unauthorized" });
      }

      return res.json({ message: "Quiz deleted successfully" });
    }
  );
});

// logout
app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({ error: "Logout failed" });
      }

      return res.json({ message: "Logged out successfully" });
    });
  } else {
    return res.status(400).json({ error: "No active session" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
