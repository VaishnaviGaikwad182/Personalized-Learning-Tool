const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  faId: { type: mongoose.Schema.Types.ObjectId, ref: "FAMode", required: true },
  subject: { type: String, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, default: "submitted" },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
