const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createFAMode, getFAModes } = require("../controllers/faController");

// ✅ Routes
router.post("/create", authMiddleware, createFAMode);
router.get("/", authMiddleware, getFAModes);

module.exports = router;
