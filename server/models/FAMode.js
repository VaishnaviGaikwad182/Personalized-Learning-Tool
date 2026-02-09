const mongoose = require("mongoose");

const faModeSchema = new mongoose.Schema({
  branch: { type: String, required: true },      // department
  division: { type: String, required: true },    // NEW: division
  year: { type: String, required: true },
  subject: { type: String, required: true },
  faType: { type: String, required: true },
  mode: { type: String, required: true },
  deadline: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("FAMode", faModeSchema);
