import React, { useEffect, useState } from "react";
import { getClassQueries } from "../../api/teacherAPI";
import { setToken } from "../../utils/api";

const QuerySection = ({ filters }) => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      !filters.department ||
      !filters.subject ||
      !filters.division ||
      !filters.year
    )
      return;

    const token = localStorage.getItem("token");
    if (!token) return;

    setToken(token);

    const fetchQueries = async () => {
      setLoading(true);
      try {
        const res = await getClassQueries(filters);
        setQueries(res.data);
      } catch (err) {
        console.log(
          "Error fetching class queries:",
          err.response?.data?.msg || err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [filters]);

  return (
    <div className="bg-white shadow-md p-6 rounded-2xl h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Class Queries / Notifications</h2>

      {loading ? (
        <p>Loading queries...</p>
      ) : queries.length === 0 ? (
        <p>No queries found for this class.</p>
      ) : (
        <div className="space-y-4">
          {queries.map((q) => (
            <div
              key={q._id}
              className="bg-gray-50 p-4 rounded-2xl shadow-sm space-y-2"
            >
              {/* STUDENT QUERY */}
              <p className="font-semibold text-blue-700">
                {q.studentId?.name || "Student"}: {q.subject} Query
              </p>

              <p className="bg-gray-100 p-3 rounded">{q.message}</p>

              {/* TEACHER RESPONSE */}
              {q.reply ? (
                <>
                  <p className="font-semibold text-green-700 mt-2">
                    Your Response:
                  </p>
                  <p className="bg-green-100 p-3 rounded">{q.reply}</p>
                </>
              ) : (
                <p className="text-gray-500 italic">Waiting for response...</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuerySection;
