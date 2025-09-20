import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    // Explicitly remove the token from localStorage
    localStorage.removeItem("token");
    // Clear the token from the application's state to trigger re-render
    setToken(""); 
  };

  return (
    <div className='flex items-center justify-between px-8 py-4 shadow-sm'>
      <img src={assets.logo} alt="Logo" className='w-40' />
      <button
        onClick={handleLogout}
        className='px-6 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

