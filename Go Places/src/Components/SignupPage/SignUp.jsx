import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [showSignup, setShowSignup] = useState(true); // State to track if signup page is shown
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // State to track hover state

  const handleClose = () => {
    if (!selectedForm) {
      navigate('/'); // Navigate to home if no form is selected
    } else {
      setSelectedForm(null); // Reset selected form state
      setShowSignup(true); // Show signup page again
    }
  };
  
  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
    setShowSignup(false); // Hide signup page when form is selected
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <button
        className="absolute top-4 right-4 text-white text-4xl pr-20 pt-10 focus:outline-none"
        onClick={handleClose}
      >
        &times;
      </button>
      <div className="max-w-4xl w-3/12 p-6 bg-black rounded-lg shadow-md relative overflow-hidden">
        <h1 className="text-3xl font-bold text-center mb-8">SIGN UP</h1>
        {!selectedForm ? (
          <div className="flex flex-col space-y-4">
            <button
              className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition relative"
              onClick={() => handleFormSelection('driver')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ position: 'relative' }}
            >
              Create Driver Account
              {isHovered && (
                <span
                  className="absolute top-0 left-0 right-0 bottom-0 border border-white rounded-full"
                  style={{
                    mixBlendMode: 'overlay',
                    animation: 'animate 2s linear infinite',
                  }}
                ></span>
              )}
            </button>
            <button
              className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition relative"
              onClick={() => handleFormSelection('rider')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ position: 'relative' }}
            >
              Create Rider Account
              {isHovered && (
                <span
                  className="absolute top-0 left-0 right-0 bottom-0 border border-white rounded-full"
                  style={{
                    mixBlendMode: 'overlay',
                    animation: 'animate 2s linear infinite',
                  }}
                ></span>
              )}
            </button>
          </div>
        ) : (
          <div className="p-6 rounded-lg border-2 border-red-800 text-center relative">
            <h2 className="text-2xl font-bold mb-4">
              {selectedForm === 'driver' ? 'Create Driver Account' : 'Create Rider Account'}
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor={`${selectedForm}-username`} className="block text-sm font-medium"></label>
                <input
                  type="text"
                  id={`${selectedForm}-username`}
                  name={`${selectedForm}-username`}
                  placeholder="Username"
                  className="w-full px-3 py-2 bg-transparent font-bold text-white border rounded-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor={`${selectedForm}-number`} className="block text-sm font-medium"></label>
                <input
                  type="tel"
                  id={`${selectedForm}-number`}
                  name={`${selectedForm}-number`}
                  placeholder="Number"
                  className="w-full px-3 py-2 bg-transparent font-bold text-white border rounded-full"
                  pattern="[0-9]*"
                />
              </div>
              <div className="mb-4">
                <label htmlFor={`${selectedForm}-password`} className="block text-sm font-medium"></label>
                <input
                  type="password"
                  id={`${selectedForm}-password`}
                  name={`${selectedForm}-password`}
                  placeholder="Password"
                  className="w-full px-3 py-2 bg-transparent font-bold text-white border rounded-full"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ position: 'relative' }}
              >
                Sign Up as {selectedForm === 'driver' ? 'Driver' : 'Rider'}
                {isHovered && (
                  <span
                    className="absolute top-0 left-0 right-0 bottom-0 border border-white rounded-full"
                    style={{
                      mixBlendMode: 'overlay',
                      animation: 'animate 2s linear infinite',
                    }}
                  ></span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
