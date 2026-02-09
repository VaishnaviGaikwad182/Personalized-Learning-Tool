import React, { useEffect, useState } from "react";
import { getMyMarks, getMyQueries } from "../../api/studentAPI";
import { setToken } from "../../utils/api";

const StudentDashboard = () => {
  const [faMarks, setFaMarks] = useState("Loading...");
  const [saMarks, setSaMarks] = useState("Loading...");
  const [pendingQueries, setPendingQueries] = useState(0);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setToken(token);

    const fetchDashboardData = async () => {
      try {
        // MARKS
        const marksRes = await getMyMarks();
        const marks = marksRes.data || [];

        const faMarksArr = marks.filter((m) => m.examType?.startsWith("FA"));

        const latestFA = faMarksArr.sort((a, b) => {
          const numA = parseInt(a.examType.replace(/\D/g, "")) || 0;
          const numB = parseInt(b.examType.replace(/\D/g, "")) || 0;
          return numB - numA;
        })[0];

        setFaMarks(latestFA ? latestFA.marks : "N/A");

        const sa = marks.find((m) => m.examType === "SA");
        setSaMarks(sa ? sa.marks : "N/A");

        // QUERIES
        const queriesRes = await getMyQueries();
        const qData = queriesRes.data || [];

        setQueries(qData);

        setPendingQueries(qData.filter((q) => q.status !== "resolved").length);
      } catch (err) {
        setFaMarks("Error");
        setSaMarks("Error");
        setPendingQueries(0);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Latest FA Marks</h3>
          <p className="text-3xl font-bold text-blue-600">{faMarks}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">SA Marks</h3>
          <p className="text-3xl font-bold text-green-600">{saMarks}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Pending Queries</h3>
          <p className="text-3xl font-bold text-red-600">{pendingQueries}</p>
        </div>
      </div>

      {/* QUERIES SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-bold mb-4">My Queries</h3>

        {queries.length === 0 ? (
          <p>No queries yet.</p>
        ) : (
          <div className="space-y-4">
            {queries.map((q) => (
              <div
                key={q._id}
                className="bg-gray-50 p-4 rounded shadow-sm space-y-2"
              >
                {/* YOUR QUERY */}
                <p className="font-semibold text-blue-700">
                  Your {q.subject} Query:
                </p>

                <p className="bg-gray-100 p-2 rounded">{q.message}</p>

                {/* RESPONSE */}
                {q.reply ? (
                  <>
                    <p className="font-semibold text-green-700 mt-2">
                      {q.subject} Teacher Response:
                    </p>

                    <p className="bg-green-100 p-2 rounded">{q.reply}</p>
                  </>
                ) : (
                  <p className="text-gray-500 italic">
                    Waiting for response...
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
