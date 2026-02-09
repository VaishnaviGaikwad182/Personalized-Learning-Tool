import React, { useEffect, useState } from "react";
import { getMyMarks } from "../../api/studentAPI";
import { setToken } from "../../utils/api";

const StudentMarks = () => {
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token); // attach JWT token to Axios

    const fetchMarks = async () => {
      try {
        const res = await getMyMarks(); // GET /api/marks/my
        const data = res.data;

        // Group marks by subject
        const grouped = {};
        data.forEach((m) => {
          if (!grouped[m.subject]) grouped[m.subject] = {};
          grouped[m.subject][m.examType] = m.marks;
        });

        setMarks(grouped);
      } catch (err) {
        console.error(
          "Error fetching marks:",
          err.response?.data?.msg || err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  if (loading) return <p className="p-6">Loading marks...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">FA / SA Marks</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Subject</th>
            <th className="p-2">FA1</th>
            <th className="p-2">FA2</th>
            <th className="p-2">SA</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(marks).length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No marks available
              </td>
            </tr>
          ) : (
            Object.keys(marks).map((subject) => (
              <tr key={subject} className="text-center">
                <td className="p-2">{subject}</td>
                <td className="p-2">{marks[subject]["FA1"] ?? "-"}</td>
                <td className="p-2">{marks[subject]["FA2"] ?? "-"}</td>
                <td className="p-2">{marks[subject]["SA"] ?? "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentMarks;
