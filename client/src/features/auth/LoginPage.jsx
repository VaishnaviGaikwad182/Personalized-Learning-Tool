import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authAPI";
import { setToken } from "../../utils/api";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "Student";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });

      // Check if user role matches page role
      if (role.toLowerCase() !== data.user.role) {
        alert(`This is a ${role} login page. Please enter valid credentials.`);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("name", data.user.name);

      setToken(data.token);

      data.user.role === "teacher"
        ? navigate("/teacher/dashboard")
        : navigate("/student/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    role.toLowerCase() === "teacher"
      ? navigate("/signup/teacher")
      : navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-300">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-2 text-center capitalize">
          {role} Login
        </h2>
        <p className="text-center mb-6">Welcome Back!</p>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
          />
        </div>

        <div className="text-right mb-4">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-blue-400 hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-300 to-blue-900 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={handleSignupRedirect}
            className="text-blue-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
