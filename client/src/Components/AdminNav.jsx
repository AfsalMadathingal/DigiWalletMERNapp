import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
   
    <>
    <div className="navbar backdrop-filter backdrop-blur-lg bg-black bg-opacity-20 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-300 rounded-box w-52 backdrop-filter backdrop-blur-lg bg-opacity-50 text-white"
          >
            <li className="text-xl cursor-pointer px-16 py-5 hover:text-blue-500 transition-colors duration-300">
              Home
            </li>
            <li className="text-xl cursor-pointer px-16 py-5 hover:text-blue-500 transition-colors duration-300">
              About
            </li>
            <li className="text-xl cursor-pointer px-16 py-5 hover:text-blue-500 transition-colors duration-300">
              Contact
            </li>
          </ul>
        </div>
        <Link to="/">
          <p className="btn btn-ghost text-xl">DigiWallet Admin Panel</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
       
      </div>
      <div className="navbar-end">
        <Link
          to="/admin/login"
          className="cursor-pointer w-16 h-10 btn-grad backdrop-filter backdrop-blur-lg bg-opacity-50"
        >
          Login
        </Link>
      </div>
    </div>
  </>
  )
}

export default AdminNav
