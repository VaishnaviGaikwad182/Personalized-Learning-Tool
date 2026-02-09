const User = require("../models/User");
const Mark = require("../models/Marks");
const Submission = require("../models/Submission");
const FAMode = require("../models/FAMode");
const Query = require("../models/Query");

// ======================
// GET CLASS STATS
// ======================
exports.getClassStats = async (req, res) => {
  try {
    const { department, year, division, subject } = req.query;
    if (!department || !year || !division || !subject) {
      return res.status(400).json({ msg: "Missing required filters" });
    }

    // ✅ Find students in this class
    const students = await User.find({
      role: "student",
      branch: department,
      year,
      division,
    });

    const studentIds = students.map((s) => s._id);

    // ✅ Marks for this subject and students
    const marks = await Mark.find({
      studentId: { $in: studentIds },
      subject,
    });

    const totalMarks = marks.reduce((sum, m) => sum + m.marks, 0);
    const avgMarks = marks.length ? (totalMarks / marks.length).toFixed(2) : 0;

    // ✅ Submissions received
    const submissions = await Submission.find({
      studentId: { $in: studentIds },
      subject,
    });

    // ✅ Check if FA mode is set
    const faModeExists = await FAMode.exists({
      branch: department,
      year,
      subject,
      isActive: true,
    });

    // ✅ Pending Queries
    const queries = await Query.find({
      studentId: { $in: studentIds },
      subject,
    });
    const pendingQueries = queries.filter((q) => q.status !== "resolved").length;

    res.json({
      avgMarks,
      pendingQueries,
      totalStudents: students.length,
      submissionsReceived: submissions.length,
      faMode: !!faModeExists,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ======================
// GET CLASS QUERIES (Dashboard)
// ======================
exports.getClassQueries = async (req, res) => {
  try {
    const { department, year, division, subject } = req.query;
    if (!department || !year || !division || !subject) {
      return res.status(400).json({ msg: "Missing required filters" });
    }

    const students = await User.find({
      role: "student",
      branch: department,
      year,
      division,
    });

    const studentIds = students.map((s) => s._id);

    const queries = await Query.find({
      studentId: { $in: studentIds },
      subject,
    }).populate("studentId", "name");

    res.json(queries);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ======================
// GET ALL QUERIES FOR TEACHER
// ======================
exports.getAllQueries = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ msg: "Only teachers allowed" });
    }

    const queries = await Query.find({ teacherId: req.user.id }).populate(
      "studentId",
      "name email"
    );

    res.json(queries);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ======================
// RESOLVE QUERY
// ======================
exports.resolveQuery = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ msg: "Only teachers allowed" });
    }

    const { reply } = req.body;

    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { reply, status: "resolved" },
      { new: true }
    ).populate("studentId", "name email");

    res.json(query);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
