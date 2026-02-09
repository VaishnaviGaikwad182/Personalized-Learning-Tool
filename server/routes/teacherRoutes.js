const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getClassStats,
  getClassQueries,
  getAllQueries,
  resolveQuery,
} = require("../controllers/teacherController");
const User = require("../models/User");

// ✅ Class Stats
router.get("/class-stats", authMiddleware, getClassStats);

// ✅ Queries for Class (Dashboard QuerySection)
router.get("/class-queries", authMiddleware, getClassQueries);

// ✅ All queries for teacher (Queries Page)
router.get("/queries/all", authMiddleware, getAllQueries);

// ✅ Resolve query
router.put("/queries/:id/resolve", authMiddleware, resolveQuery);

// ✅ Get all teachers
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("name");
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
