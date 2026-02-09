const Marks = require("../models/Marks");
const User = require("../models/User");
const mongoose = require("mongoose");
const xlsx = require("xlsx");

// Upload marks via file
exports.uploadMarks = async (req, res) => {
  try {
    if (req.user.role !== "teacher")
      return res.status(403).json({ msg: "Only teachers allowed" });

    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const { subject, examType, year, branch, div } = req.body;

    // Read excel
    const workbook = xlsx.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    let inserted = 0;

    for (const row of rows) {
      const { prn, marks } = row;

      const student = await User.findOne({
        prn,
        role: "student",
        branch,
        year,
        division: div,
      });

      if (!student) continue;

      // Upsert (update if exists)
      await Marks.findOneAndUpdate(
        {
          studentId: student._id,
          subject,
          examType,
        },
        {
          studentId: student._id,
          subject,
          marks,
          examType,
          year,
          branch,
          teacherId: req.user.id,
        },
        { upsert: true }
      );

      inserted++;
    }

    res.json({ msg: `Uploaded ${inserted} records` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Student fetch
exports.getMyMarks = async (req, res) => {
  try {
    const data = await Marks.find({ studentId: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
