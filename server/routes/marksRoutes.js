const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/authMiddleware");
const { uploadMarks, getMyMarks } = require("../controllers/marksController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload file
router.post("/upload", auth, upload.single("file"), uploadMarks);

// Student marks
router.get("/my", auth, getMyMarks);

module.exports = router;
