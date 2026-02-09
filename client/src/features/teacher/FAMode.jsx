import React, { useState } from "react";
import { createFAMode } from "../../api/teacherAPI";
import { setToken } from "../../utils/api";

const FAMode = () => {
  const [form, setForm] = useState({
    department: "",
    division: "",
    subject: "",
    year: "",
    faType: "",
    mode: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No token, please login");
      setToken(token);

      await createFAMode({
        branch: form.department,
        div: form.division,
        year: form.year,
        subject: form.subject,
        faType: form.faType, // ✅ send correct faType
        mode: form.mode,
        deadline: form.deadline,
      });

      setMessage("FA Mode set successfully!");
      setForm({
        department: "",
        division: "",
        subject: "",
        year: "",
        faType: "",
        mode: "",
        deadline: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to set FA Mode");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Set FA Mode
      </h2>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject */}
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Enter Full Subject Name"
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            />

            {/* Division */}
            <select
              name="division"
              value={form.division}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Division</option>
              {["A","B","C","D","E","F","G"].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Department / Branch */}
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Department</option>
              <option value="FE">Applied Science & Humanities</option>
              <option value="CS">Computer Engineering</option>
              <option value="CS_AI">CS & AI-ML</option>
              <option value="IT">Information Technology</option>
              <option value="ENTC">Electronics & Telecommunication</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
            </select>

            {/* Year */}
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Year</option>
              <option value="FE">First Year</option>
              <option value="SE">Second Year</option>
              <option value="TE">Third Year</option>
              <option value="BE">Final Year</option>
            </select>

            {/* FA Type */}
            <select
              name="faType"
              value={form.faType}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select FA Type</option>
              <option value="FA1">FA1</option>
              <option value="FA2">FA2</option>
            </select>

            {/* Mode */}
            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Mode</option>
              <option value="Online">Online Quiz</option>
              <option value="Offline">Offline Test</option>
              <option value="Assignment">Assignment</option>
              <option value="Presentation">Presentation</option>
              <option value="Poster">Poster</option>
              <option value="Other">Other</option>
            </select>

            {/* Deadline */}
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Setting..." : "Set FA Mode"}
            </button>
          </div>

          {message && <p className="text-center text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default FAMode;
