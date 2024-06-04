// src/components/Navbar.js

import React, { useState } from 'react';

const UserNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
              <img
                className="w-10 h-10 rounded-full"
                src="https://via.placeholder.com/40"
                alt="User Avatar"
              />
              <span className="text-gray-700">Username</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
