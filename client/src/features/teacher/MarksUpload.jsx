import React, { useState } from "react";
import { uploadMarks } from "../../api/teacherAPI";
import { setToken } from "../../utils/api";

const MarksUpload = () => {
  const [form, setForm] = useState({
    department: "",
    subject: "",
    paper: "",
    div: "",
    year: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!file) return alert("Please choose a file");

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No token, please login");

      setToken(token);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("subject", form.subject);
      formData.append("examType", form.paper);
      formData.append("year", form.year);
      formData.append("branch", form.department);
      formData.append("div", form.div);

      await uploadMarks(formData);

      setMessage("Marks uploaded successfully!");
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Upload Student Marks
      </h2>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Enter Full Subject Name (e.g., Database Management Systems)"
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            />

            <select
              name="div"
              value={form.div}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Department</option>
              <option value="FE">Applied Science and Humanities</option>
              <option value="CS">Computer Engineering</option>
              <option value="CS_AI">Computer Science & AI-ML</option>
              <option value="IT">Information Technology</option>
              <option value="ENTC">Electronics & Telecommunication</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
            </select>

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

            <select
              name="paper"
              value={form.paper}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Paper</option>
              <option value="FA1">FA1</option>
              <option value="FA2">FA2</option>
              <option value="SA">SA</option>
            </select>
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="text-sm font-medium">
              Upload File (.csv or .xlsx only)
            </label>

            <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition bg-gray-50">
              <input
                type="file"
                accept=".csv,.xlsx"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />

              <p className="text-gray-500">Click to upload or drag file here</p>

              {file && (
                <p className="text-blue-600 mt-2 font-medium">{file.name}</p>
              )}
            </label>

            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Remove file
              </button>
            )}
          </div>

          {/* SUBMIT */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Uploading..." : "Upload Marks"}
            </button>
          </div>

          {message && <p className="text-center text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default MarksUpload;
