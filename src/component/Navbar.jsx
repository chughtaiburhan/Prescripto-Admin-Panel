import React, { useContext } from 'react';
import { assets } from "../assets/assets_frontend/assets";
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext); // Assuming you might want to handle logout later

  const handleLogout = () => {
    setAToken("");
    localStorage.removeItem('aToken');
    window.location.href = '/login'; // Example redirection
  };

  return (
    <nav className='bg-white border-b shadow-sm py-3 px-4 sm:px-6 lg:px-8'>
      <div className='flex justify-between items-center h-16'>
        {/* Logo and Role */}
        <div className='flex items-center gap-3'>
          <img className='w-32 sm:w-40 cursor-pointer' src={assets.logo} alt="admin-logo" />
          <div className='bg-gray-100 border border-gray-300 rounded-full px-3 py-2 text-sm font-semibold text-gray-700'>
            {aToken ? "Admin" : "Doctor"}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className='bg-[#5f6FFF] text-white font-semibold text-sm px-4 py-2 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;