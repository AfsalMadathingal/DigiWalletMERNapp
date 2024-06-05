import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { signOutStart, signOutSuccess } from "../Redux/user/slice";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(signOutStart());
    localStorage.clear();
    dispatch(signOutSuccess());
    navigate("/login");
    toast.success("Logout Success");
  };
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  return (
    <>
      <div className="navbar backdrop-filter backdrop-blur-lg bg-black bg-opacity-20 text-white  ">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <Dropdown>
              <DropdownTrigger>
                <Button color="" variant=""><i className="fa-solid fa-bars"></i></Button>
              </DropdownTrigger>
              <DropdownMenu  aria-label="Dynamic Actions">
              
                  <DropdownItem>
                   Home
                  </DropdownItem>
                  <DropdownItem>
                   About
                  </DropdownItem>
                  <DropdownItem>
                   Contact
                  </DropdownItem>
                
              </DropdownMenu>
            </Dropdown>
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
              {loading ? (
                <ReactLoading
                  type="bars"
                  height="25px"
                  width="25px"
                  color="white"
                />
              ) : (
                "SignOut"
              )}
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
