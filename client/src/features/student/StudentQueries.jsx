import React, { useEffect, useState } from "react";
import { getMyQueries, createQuery } from "../../api/queryAPI";
import API, { setToken } from "../../utils/api";

const StudentQueries = () => {
  const [queries, setQueries] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    fetchQueries();
    fetchTeachers();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await getMyQueries();
      setQueries(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teacher/all");
      setTeachers(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async () => {
    if (!subject.trim() || !teacherId || !message.trim()) {
      alert("Fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await createQuery({ subject, message, teacherId });
      setQueries([res.data, ...queries]);
      setSubject("");
      setTeacherId("");
      setMessage("");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to submit query");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading queries...</p>;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 bg-gray-100">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Student Queries
      </h2>

      {/* Raise Query Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
        <input
          type="text"
          placeholder="Enter Full Subject Name (e.g., Database Management Systems)"
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <select
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        <textarea
          rows="4"
          placeholder="Enter your query..."
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {submitting ? "Submitting..." : "Submit Query"}
          </button>
        </div>
      </div>

      {/* Query Display */}
      {queries.length === 0 ? (
        <p>No queries found.</p>
      ) : (
        queries.map((q) => (
          <div key={q._id} className="bg-white p-5 rounded-xl shadow space-y-2">
            <p className="font-semibold text-blue-700">
              Your {q.subject} Query to {q.teacherName || "Teacher"}:
            </p>

            <p className="bg-gray-100 p-3 rounded">{q.message}</p>

            {q.reply ? (
              <>
                <p className="font-semibold text-green-700 mt-2">
                  Teacher Response:
                </p>

                <p className="bg-green-100 p-3 rounded">{q.reply}</p>
              </>
            ) : (
              <p className="text-gray-500 italic">Waiting for response...</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default StudentQueries;
