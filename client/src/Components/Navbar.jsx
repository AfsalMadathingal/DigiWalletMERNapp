import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { signOutStart, signOutSuccess } from "../Redux/user/slice";
import { toast } from "react-toastify";


const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const  dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading} = useSelector(state => state.user)

  const handleLogout = () => {
    
    dispatch(signOutStart())
    localStorage.clear();
    dispatch(signOutSuccess());
    navigate("/login");
    toast.success("Logout Success");
   
  };

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
            <ul className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-300 rounded-box w-52 backdrop-filter backdrop-blur-lg bg-opacity-50 text-white">
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
            <p className="btn btn-ghost text-xl">DigiWallet</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="gap-36 menu menu-horizontal px-1">
            <Link to="/">
              <li className="text-xl cursor-pointer hover:text-blue-500 transition-colors duration-300">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="text-xl cursor-pointer hover:text-blue-500 transition-colors duration-300">
                About
              </li>
            </Link>
            <li className="text-xl cursor-pointer hover:text-blue-500 transition-colors duration-300">
              Contact
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer w-16 h-10 btn-grad backdrop-filter backdrop-blur-lg bg-opacity-50"
            >
              {loading ? <ReactLoading type="bars" height="25px" width="25px" color="white" /> : "SignOut"}
            </button>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer w-16 h-10 btn-grad backdrop-filter backdrop-blur-lg bg-opacity-50"
            >
              SignIn
            </Link>
          )}
        </div>
      </div>
    
    </>
  );
};

export default Navbar;
