import React, { useState, useEffect } from "react";
import QuerySection from "./QuerySection";
import { getClassStats } from "../../api/teacherAPI";
import { setToken } from "../../utils/api";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    department: "",
    subject: "",
    division: "",
    year: "",
  });

  const [stats, setStats] = useState({});
  const [loadingStats, setLoadingStats] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  // ✅ Check if all filters selected
  useEffect(() => {
    setAllSelected(
      Boolean(
        filters.department &&
        filters.subject &&
        filters.division &&
        filters.year
      )
    );
  }, [filters]);

  // ✅ Fetch stats when filters ready
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);

    const fetchStats = async () => {
      if (!allSelected) return;

      setLoadingStats(true);
      try {
        const res = await getClassStats(filters);
        setStats(res.data || {});
      } catch (err) {
        console.log(
          "Error fetching stats:",
          err.response?.data?.msg || err.message
        );
        setStats({});
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [allSelected, filters]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 bg-gray-100">

      {/* Filter Form */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Select Class Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            value={filters.subject}
            onChange={(e) =>
              setFilters({ ...filters, subject: e.target.value })
            }
            placeholder="Enter Full Subject Name (e.g., Database Management Systems)"
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
          />

          <select
            value={filters.division}
            onChange={(e) =>
              setFilters({ ...filters, division: e.target.value })
            }
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg">
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
            value={filters.department}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
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
            value={filters.year}
            onChange={(e) =>
              setFilters({ ...filters, year: e.target.value })
            }
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg"
          >
            <option value="">Select Year</option>
            <option value="FE">First Year</option>
            <option value="SE">Second Year</option>
            <option value="TE">Third Year</option>
            <option value="BE">Final Year</option>
          </select>

        </div>

        {!allSelected && (
          <p className="text-center text-gray-500 mt-4">
            Please select subject, division, department and year to view class stats.
          </p>
        )}
      </div>

      {/* Stats Section */}
      {allSelected && (
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Overall Class Stats</h2>

          {loadingStats ? (
            <p>Loading stats...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-green-600">
                  {stats.avgMarks ?? "-"}
                </p>
                <p className="text-gray-700 mt-1">Avg. Marks</p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-purple-600">
                  {stats.pendingQueries ?? "-"}
                </p>
                <p className="text-gray-700 mt-1">Pending Queries</p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalStudents ?? "-"}
                </p>
                <p className="text-gray-700 mt-1">Total Students</p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-indigo-600">
                  {stats.submissionsReceived ?? "-"}
                </p>
                <p className="text-gray-700 mt-1">Submissions Received</p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-teal-600">
                  {stats.faMode ? "✅ Yes" : "❌ No"}
                </p>
                <p className="text-gray-700 mt-1">FA Mode Set</p>
              </div>

            </div>
          )}
        </div>
      )}

      {/* Query Section */}
      {allSelected && (
        <QuerySection filters={filters} />
      )}

    </div>
  );
};

export default Dashboard;
