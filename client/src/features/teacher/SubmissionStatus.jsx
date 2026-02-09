import React, { useEffect, useState } from "react";
import { getSubmissions } from "../../api/submissionAPI";
import { setToken } from "../../utils/api";

const SubmissionStatus = () => {
  const [filters, setFilters] = useState({
    subject: "",
    department: "",
    year: "",
    div: "",
    paper: "",
  });

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const allSelected = Object.values(filters).every((val) => val !== "");

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!allSelected) return;

      const token = localStorage.getItem("token");
      if (!token) return;
      setToken(token);

      setLoading(true);
      setError("");
      try {
        const res = await getSubmissions(filters);
        setSubmissions(res.data);
      } catch (err) {
        console.error(
          "Error fetching submissions:",
          err.response?.data?.msg || err.message
        );
        setError(err.response?.data?.msg || "Failed to fetch submissions");
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [filters, allSelected]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Check Student Submissions
      </h2>

      {/* FILTER CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="subject"
              value={filters.subject}
              onChange={handleChange}
              placeholder="Enter Subject Name"
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            />
            <select
              name="div"
              value={filters.div}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Division</option>
              {["A", "B", "C", "D", "E", "F", "G"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              name="department"
              value={filters.department}
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
            <select
              name="year"
              value={filters.year}
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
              value={filters.paper}
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
        </form>
      </div>

      {/* RESULTS CARD */}
      {allSelected && (
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">Submission Summary</h3>

          {loading ? (
            <p>Loading submissions...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : submissions.length === 0 ? (
            <p>No submissions found for the selected filters.</p>
          ) : (
            <table className="w-full text-left border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">PRN</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">FA Type</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">File</th>
                  <th className="p-2">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{sub.prn}</td>
                    <td className="p-2">{sub.name}</td>
                    <td className="p-2">{sub.faType}</td>
                    <td className="p-2">{sub.subject}</td>
                    <td className="p-2">
                      {sub.fileUrl ? (
                        <a
                          href={sub.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View File
                        </a>
                      ) : (
                        "No File"
                      )}
                    </td>
                    <td className="p-2">
                      {new Date(sub.submittedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionStatus;
