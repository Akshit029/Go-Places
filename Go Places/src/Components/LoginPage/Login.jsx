import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [selectedLogin, setSelectedLogin] = useState(null);
  const [showLoginSelection, setShowLoginSelection] = useState(true); // State to track if login selection is shown
  const navigate = useNavigate();

  const handleClose = () => {
    if (!selectedLogin) {
      navigate('/'); // Navigate to home if no login form is selected
    } else {
      setSelectedLogin(null); // Reset selected login state
      setShowLoginSelection(true); // Show login selection page again
    }
  };

  const handleLoginSelection = (loginType) => {
    setSelectedLogin(loginType);
    setShowLoginSelection(false); // Hide login selection when a form is selected
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-black text-white">
      <button
          className="absolute top-4 right-4 text-white text-4xl pr-20 pt-10 rounded-full focus:outline-none"
          onClick={handleClose}
        >
          &times;
        </button>
      <div className="max-w-md w-full p-6  rounded-lg  relative">
        
        {showLoginSelection && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">LOGIN</h1>
            <div className="flex flex-col space-y-4">
              <button
                className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
                onClick={() => handleLoginSelection('driver')}
              >
                Login as Driver
              </button>
              <button
                className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
                onClick={() => handleLoginSelection('rider')}
              >
                Login as Rider
              </button>
            </div>
          </>
        )}

        {selectedLogin && (
          <div className="relative p-6 rounded-lg">
            <div
              className="absolute inset-0 rounded-lg border-2 border-red-800 transition-all duration-500 ease-in-out transform"
              style={{
                animation: 'rotate-border 5s linear  infinite',
              }}
            ></div>
            <h2 className="text-2xl font-bold mb-4 relative z-10">
              {selectedLogin === 'driver' ? 'Driver Login' : 'Rider Login'}
            </h2>
            <form className="relative z-10">
              <div className="mb-4">
                <label htmlFor={`${selectedLogin}-username`} className="block text-sm font-medium"></label>
                <input
                  type="text"
                  id={`${selectedLogin}-username`}
                  name={`${selectedLogin}-username`}
                  placeholder="Username"
                  className="w-full px-3 py-2 bg-transparent font-bold text-white border rounded-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor={`${selectedLogin}-password`} className="block text-sm font-medium"></label>
                <input
                  type="password"
                  id={`${selectedLogin}-password`}
                  name={`${selectedLogin}-password`}
                  placeholder="Password " 
                  className="w-full px-3 py-2 bg-transparent font-bold text-white border outline-none rounded-full"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
              >
                Login as {selectedLogin === 'driver' ? 'Driver' : 'Rider'}
              </button>
            </form>
            <div className="mt-4 text-center text-sm relative z-10">
              <a href="/forgot" className="text-gray-400 font-bold hover:text-white">Forgot Password?</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
