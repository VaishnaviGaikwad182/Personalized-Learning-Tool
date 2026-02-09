import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authAPI";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    prn: "",
    year: "",
    branch: "",
    division: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, prn, year, branch, division, email, password } = formData;

    if (!name || !prn || !year || !branch || !division || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // PRN validation: pattern like 123B5B294
    const prnRegex = /^[0-9]{3}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{3}$/;
    if (!prnRegex.test(prn)) {
      alert("PRN format is invalid (example: 123B5B294)");
      return;
    }

    setLoading(true);
    try {
      await registerUser(formData);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-300 px-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Student Registration
        </h2>
        <p className="text-blue-400 text-center mb-6">Create your account</p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* NAME */}
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          />

          {/* PRN */}
          <input
            name="prn"
            placeholder="PRN (e.g., 123B1B001)"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          />

          {/* DEPARTMENT SELECT */}
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
          </select>

          {/* YEAR SELECT */}
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          >
            <option value="">Select Year</option>
            <option value="FE">First Year</option>
            <option value="SE">Second Year</option>
            <option value="TE">Third Year</option>
            <option value="BE">Final Year</option>
          </select>

          {/* DIVISION SELECT */}
          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800"
          >
            <option value="">Select Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 md:col-span-2"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-blue-300 to-blue-900 py-3 rounded-lg font-semibold md:col-span-2"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
