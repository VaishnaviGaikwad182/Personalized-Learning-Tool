import React, { useState, useEffect } from "react";
import { submitFASubmission, getAvailableFAs } from "../../api/submissionAPI";
import { setToken } from "../../utils/api";
import { X } from "lucide-react";

const StudentFASubmission = () => {
  const [fas, setFas] = useState([]);
  const [fileMap, setFileMap] = useState({});
  const [submittingMap, setSubmittingMap] = useState({});
  const [messageMap, setMessageMap] = useState({});

  // fetch FA Modes
  useEffect(() => {
    const fetchFA = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        setToken(token);

        const res = await getAvailableFAs();
        setFas(
          res.data.map((fa) => ({
            ...fa,
            submittedByStudent: !!fa.submittedByStudent,
            submittedFile: fa.submittedFile || null,
          }))
        );
      } catch (err) {
        console.log("Error fetching FAs:", err.response?.data?.msg || err.message);
      }
    };
    fetchFA();
  }, []);

  const isDeadlinePassed = (deadline) =>
    deadline ? new Date(deadline) < new Date() : false;

  const handleFileChange = (faId, file) => setFileMap({ ...fileMap, [faId]: file });

  const handleSubmit = async (fa) => {
    if (!fileMap[fa._id]) {
      alert("Please upload a file before submitting.");
      return;
    }

    const token = localStorage.getItem("token");
    setToken(token);

    const formData = new FormData();
    formData.append("faId", fa._id);
    formData.append("subject", fa.subject);
    formData.append("file", fileMap[fa._id]);

    try {
      setSubmittingMap({ ...submittingMap, [fa._id]: true });
      setMessageMap({ ...messageMap, [fa._id]: "" });

      const res = await submitFASubmission(formData);

      setFas(
        fas.map((f) =>
          f._id === fa._id
            ? {
                ...f,
                submittedByStudent: true,
                submittedFile: res.data.fileUrl || fileMap[fa._id].name,
              }
            : f
        )
      );

      setMessageMap({ ...messageMap, [fa._id]: "FA submitted successfully!" });
    } catch (err) {
      setMessageMap({
        ...messageMap,
        [fa._id]: err.response?.data?.msg || "Submission failed",
      });
    } finally {
      setSubmittingMap({ ...submittingMap, [fa._id]: false });
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        FAs Available for Submission
      </h2>

      <div className="space-y-6">
        {fas.map((fa) => {
          const deadlinePassed = isDeadlinePassed(fa.deadline);
          const alreadySubmitted = fa.submittedByStudent;

          return (
            <div
              key={fa._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{fa.subject}</h3>
                  <p className="text-gray-500 font-medium mt-1">{fa.faType}</p>
                </div>
                <div className="flex space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      fa.mode === "Online"
                        ? "bg-blue-100 text-blue-800"
                        : fa.mode === "Offline"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {fa.mode}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      deadlinePassed ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {fa.deadline
                      ? new Date(fa.deadline).toLocaleDateString()
                      : "No Deadline"}
                  </span>
                </div>
              </div>

              {!deadlinePassed && (
                <div className="flex items-center space-x-4 w-full">
                  <label className="flex-1 flex items-center justify-between border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-blue-500 bg-gray-50 transition">
                    {alreadySubmitted ? (
                      <p className="text-green-600 font-medium truncate max-w-full">
                        {fa.submittedFile?.split("/").pop()}
                      </p>
                    ) : fileMap[fa._id] ? (
                      <div className="flex items-center justify-between w-full">
                        <p className="text-blue-600 font-medium truncate max-w-[calc(100%-30px)]">
                          {fileMap[fa._id].name}
                        </p>
                        <X
                          onClick={(e) => {
                            e.stopPropagation();
                            setFileMap({ ...fileMap, [fa._id]: null });
                          }}
                          className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Click to upload</p>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(fa._id, e.target.files[0])}
                      disabled={alreadySubmitted}
                    />
                  </label>

                  <button
                    onClick={() => handleSubmit(fa)}
                    disabled={submittingMap[fa._id] || alreadySubmitted}
                    className={`py-3 px-6 rounded-lg text-white font-semibold transition ${
                      submittingMap[fa._id] || alreadySubmitted
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {alreadySubmitted
                      ? "Already Submitted"
                      : submittingMap[fa._id]
                      ? "Submitting..."
                      : "Submit FA"}
                  </button>
                </div>
              )}

              {messageMap[fa._id] && (
                <p className="text-green-600 mt-2 font-medium">{messageMap[fa._id]}</p>
              )}
              {deadlinePassed && (
                <p className="text-red-600 font-medium mt-2">Deadline Passed</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentFASubmission;
