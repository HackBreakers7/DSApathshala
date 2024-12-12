import React, { useState } from "react";
import axios from "axios";

const VerifyOTPPage = () => {
  const [username, setUsername] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/VerifyOTP/", {
        username,
        otp_code: otpCode,
      });
      setMessage(response.data.message);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Verify OTP</h1>

        {/* Success or Error Messages */}
        {message && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* OTP Field */}
          <div>
            <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-Black py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTPPage;