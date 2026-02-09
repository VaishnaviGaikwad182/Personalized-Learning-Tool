import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authAPI";

const TeacherSignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    email: "",
    password: "",
    role: "teacher",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, branch, email, password } = formData;

    if (!name || !branch || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await registerUser(formData);
      alert("Teacher signup successful! Please login.");
      navigate("/login?role=teacher");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-300 px-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Teacher Registration
        </h2>
        <p className="text-blue-400 text-center mb-6">Create your account</p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          />
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          >
            <option value="">Select Department</option>
            <option value="FE">Applied Science and Humanities</option>
            <option value="CS">Computer Engineering</option>
            <option value="CS_AI">Computer Science & AI-ML</option>
            <option value="IT">Information Technology</option>
            <option value="ENTC">Electronics & Telecommunication</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CE">Civil Engineering</option>
          </select>{" "}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-300 to-blue-900 py-3 rounded-lg font-semibold md:col-span-2"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login?role=teacher"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherSignUpPage;
