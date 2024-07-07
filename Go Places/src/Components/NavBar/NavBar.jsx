import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-black text-white py-4 mt-0">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white ml-4">Go Places</span>
          </Link>
        </div>

        {/* Navigation links */}
        <ul className="hidden md:flex space-x-4 items-center flex-grow justify-center font-semibold">
        <li><Link to="/about" className="text-white hover:text-gray-300 transition duration-300 transform  hover:scale-105">Services</Link></li>
        <li><Link to="/about" className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-105">Contact</Link></li>
        <li><Link to="/about" className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-105">About</Link></li>
        </ul>
            <ul className='hidden md:flex space-x-4 items-center font-semibold mr-4'>
                <li><Link to="/login" className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-105">
                    Login
                    </Link>
                </li>
                <li><Link to="/signup" className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-105">
                    Sign up
                    </Link>
                </li>
            </ul>

        {/* Mobile Menu Button (hidden on larger screens) */}
        <div className="md:hidden ">
          {/* Placeholder for mobile menu */}
          <button className="text-white hover:text-gray-300 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
