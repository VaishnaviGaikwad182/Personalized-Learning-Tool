const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const {
  getAvailableFAs,
  submitFASubmission,
  getSubmissions,
} = require("../controllers/submissionController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Student routes
router.get("/available-fas", authMiddleware, getAvailableFAs);
router.post("/submit", authMiddleware, upload.single("file"), submitFASubmission);

// Teacher routes
router.post("/all", authMiddleware, getSubmissions);

module.exports = router;
