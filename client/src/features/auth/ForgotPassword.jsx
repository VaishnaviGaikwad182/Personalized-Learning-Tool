import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-300">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-2 text-center">Reset Password</h2>
        <p className="text-blue-400 text-center mb-6">
          Enter your email to reset password
        </p>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
          />
        </div>

        <button className="w-full bg-gradient-to-r from-blue-300 to-blue-900 py-2 rounded-lg font-semibold hover:opacity-90">
          Send Reset Link
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Back to{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
