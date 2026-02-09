const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    examType: { type: String, required: true },
    year: { type: String, required: true },
    branch: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Marks", marksSchema);
