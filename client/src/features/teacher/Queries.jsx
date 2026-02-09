import React, { useEffect, useState } from "react";
import { getTeacherQueries, resolveQuery } from "../../api/teacherAPI";
import { setToken } from "../../utils/api";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyInputs, setReplyInputs] = useState({});
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setToken(token);
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const res = await getTeacherQueries();
      setQueries(res.data || []);
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyInputs({ ...replyInputs, [id]: value });
  };

  const handleSubmitReply = async (id) => {
    const reply = replyInputs[id];
    if (!reply?.trim()) return;

    setSubmitting({ ...submitting, [id]: true });
    try {
      const res = await resolveQuery(id, reply);
      setQueries(queries.map((q) => (q._id === id ? res.data : q)));
      setReplyInputs({ ...replyInputs, [id]: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to submit reply");
    } finally {
      setSubmitting({ ...submitting, [id]: false });
    }
  };

  if (loading) return <p className="p-6 text-center">Loading queries...</p>;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        All Queries
      </h2>

      {queries.length === 0 ? (
        <p className="text-center text-gray-500">No queries found.</p>
      ) : (
        queries.map((q) => (
          <div
            key={q._id}
            className="bg-white p-5 rounded-2xl shadow-md space-y-3"
          >
            <p className="font-semibold text-blue-700">
              {q.studentId?.name || "Student"}: {q.subject} Query
            </p>
            <p className="bg-gray-100 p-3 rounded">{q.message}</p>

            {q.reply ? (
              <>
                <p className="font-semibold text-green-700 mt-2">
                  Your Response:
                </p>
                <p className="bg-green-100 p-3 rounded">{q.reply}</p>
              </>
            ) : (
              <>
                <textarea
                  rows="3"
                  placeholder="Type your reply..."
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg resize-none"
                  value={replyInputs[q._id] || ""}
                  onChange={(e) => handleReplyChange(q._id, e.target.value)}
                />
                <div className="text-right">
                  <button
                    onClick={() => handleSubmitReply(q._id)}
                    disabled={submitting[q._id]}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    {submitting[q._id] ? "Submitting..." : "Submit Reply"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Queries;
