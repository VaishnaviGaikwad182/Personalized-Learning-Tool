import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import StudentSidebar from "../features/student/StudentSidebar";
import StudentDashboard from "../features/student/StudentDashboard";
import StudentMarks from "../features/student/StudentMarks";
import StudentQueries from "../features/student/StudentQueries";
import StudentFASubmission from "../features/student/StudentFASubmission";


const StudentLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar open={open} setOpen={setOpen} />

      <div className="flex-1">
        <Routes>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="marks" element={<StudentMarks />} />
          <Route path="queries" element={<StudentQueries />} />
          <Route path="fa-submit" element={<StudentFASubmission />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentLayout;
