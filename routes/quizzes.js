const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
// req.session.teacher_id

// Create a quiz
router.post("/create", (req, res) => {
  const { title, description, teacher_id } = req.body;
  if (!title || !teacher_id) {
    return res.status(400).json({ error: "Title and teacher_id required" });
  }

  const sql =
    "INSERT INTO quize (title, description, teacher_id) VALUES (?, ?, ?)";
  db.query(sql, [title, description, teacher_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Quiz created", quizId: result.insertId });
  });
});

// Get all quizzes
router.get("/getQuiz", authMiddleware, (req, res) => {
  db.query(
    "SELECT * FROM quize WHERE teacher_id = ?",
    [req.session.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database Error" });
      return res.json(results);
    }
  );
});

module.exports = router;
