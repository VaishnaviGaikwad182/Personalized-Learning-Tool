const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], default: "student" },
  prn: { type: String, required: function() { return this.role === "student"; }, unique: true },
  year: String,
  branch: String,
  division: String,
});


// ✅ Fix OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
