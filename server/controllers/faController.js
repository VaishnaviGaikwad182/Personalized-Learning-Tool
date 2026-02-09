const FAMode = require("../models/FAMode");

// ✅ Create FA Mode (Teacher)
exports.createFAMode = async (req, res) => {
  try {
    const { branch, div, year, subject, faType, mode, deadline } = req.body;

    // Validate all required fields
    if (!branch || !div || !year || !subject || !faType || !mode || !deadline) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const newFAMode = new FAMode({
      branch,
      division: div,
      year,
      subject,
      faType,
      mode,
      deadline,
      teacherId: req.user.id,
      isActive: true,
    });

    await newFAMode.save();
    res.status(201).json({ msg: "FA Mode created successfully", faMode: newFAMode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get all FA Modes (Teacher)
exports.getFAModes = async (req, res) => {
  try {
    const faModes = await FAMode.find({ teacherId: req.user.id });
    res.json(faModes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
