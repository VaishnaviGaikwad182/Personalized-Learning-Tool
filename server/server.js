require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Connect MongoDB
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// ✅ Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routers
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/marks", require("./routes/marksRoutes"));
app.use("/api/queries", require("./routes/queryRoutes"));
app.use("/api/fa", require("./routes/faRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes")); 
app.use("/api/teacher", require("./routes/teacherRoutes"));

// ✅ Protected test route
const authMiddleware = require("./middleware/authMiddleware");
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "Access granted",
    user: req.user,
  });
});

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
