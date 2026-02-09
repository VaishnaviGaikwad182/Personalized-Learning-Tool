const Submission = require("../models/Submission");
const FAMode = require("../models/FAMode");
const User = require("../models/User");

// Student submit FA
exports.submitFASubmission = async (req, res) => {
  try {
    if (req.user.role !== "student")
      return res.status(403).json({ msg: "Only students allowed" });

    const { faId, subject } = req.body;

    const fa = await FAMode.findById(faId);
    if (!fa) return res.status(404).json({ msg: "FA not found" });

    const existing = await Submission.findOne({
      faId,
      studentId: req.user.id,
    });

    if (existing) return res.status(400).json({ msg: "FA already submitted" });

    if (!req.file) return res.status(400).json({ msg: "File is required" });

    const fileUrl = `${process.env.BACKEND_URL || "http://localhost:5000"}/uploads/${req.file.filename}`;

    const submission = await Submission.create({
      studentId: req.user.id,
      faId,
      subject,
      fileUrl,
      teacherId: fa.teacherId,
    });

    res.json(submission);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Teacher fetch submissions
exports.getSubmissions = async (req, res) => {
  try {
    if (req.user.role !== "teacher")
      return res.status(403).json({ msg: "Only teachers allowed" });

    const { department, year, paper } = req.body;

    if (!department || !year || !paper) return res.json([]);

    const fas = await FAMode.find({
      teacherId: req.user.id,
      branch: department,
      year,
      faType: paper,
      isActive: true,
    }).lean();

    if (!fas.length) return res.json([]);

    const faIds = fas.map((f) => f._id);

    const submissions = await Submission.find({
      faId: { $in: faIds },
    })
      .populate("studentId", "name prn")
      .lean();

    const result = submissions.map((s) => {
      const fa = fas.find((f) => f._id.toString() === s.faId.toString());

      return {
        prn: s.studentId?.prn || "",
        name: s.studentId?.name || "",
        faType: fa?.faType || "",
        subject: fa?.subject || "",
        fileUrl: s.fileUrl,
        submittedAt: s.submittedAt,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Student available FAs
exports.getAvailableFAs = async (req, res) => {
  try {
    if (req.user.role !== "student")
      return res.status(403).json({ msg: "Only students allowed" });

    const student = await User.findById(req.user.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const faModes = await FAMode.find({
      isActive: true,
      branch: student.branch,
      year: student.year,
    }).lean();

    const submissions = await Submission.find({
      studentId: req.user.id,
    });

    const data = faModes.map((fa) => {
      const submitted = submissions.find(
        (s) => s.faId.toString() === fa._id.toString(),
      );

      return {
        ...fa,
        submittedByStudent: !!submitted,
        submittedFile: submitted?.fileUrl || null,
      };
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
