
import React, { useState } from "react";
import { FaGoogle, FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex z-1 justify-center items-center h-screen grad-bg  ">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <div className="flex justify-center pb-5">
        <i className="fa-solid fa-lock font-bold text-3xl"></i>
        </div>
      
        <h2 className="text-2xl font-bold mb-6 text-center">  Admin LogIn</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">ID</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-gray-50">
          <i className="fa-solid fa-id-card"></i>
            <input
              type="text"
              className="w-full border-none outline-none bg-transparent ml-3"
              placeholder="Enter your Id"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-gray-50 relative">
            <svg
              height="20"
              viewBox="-64 0 512 512"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border-none outline-none bg-transparent ml-3"
              placeholder="Enter your Password"
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
        </div>
        <button className="w-full py-4 mt-12 bg-blue-500 text-white rounded-lg transition duration-200 btn-grad">
          Log In
        </button>


      </div>
    </div>
  );
};

export default AdminLogin;
