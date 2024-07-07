import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if form is submitted
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here (e.g., send reset link to email)
    setIsSubmitted(true); // Simulating submission for demo
  };

  const handleBack = () => {
    navigate('/login'); // Navigate back to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <button
        className="absolute top-4 right-4 text-white text-4xl pr-20 pt-10 rounded-full focus:outline-none"
        onClick={handleBack}
      >
        &times;
      </button>
      <div className="max-w-md w-full p-6 border-2 border-red-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Forgot Password</h1>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
              <label htmlFor="email" className="block text-sm font-medium">
                
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-transparent font-bold text-white border rounded-full focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4">Instructions to reset your password have been sent to your email.</p>
            <button
              className="py-2 px-4 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
              onClick={handleBack}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
