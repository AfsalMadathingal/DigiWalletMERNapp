import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSignOutStart,
  adminSignOutSuccess,
} from "../Redux/admin/adminSlice";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { toast } from "react-toastify";

const AdminNav = () => {
  const { currentAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(adminSignOutStart());
    localStorage.clear();
    dispatch(adminSignOutSuccess());
    toast.success("Logout Success");
  }

  return (
    <>
      <div className="navbar backdrop-filter backdrop-blur-lg bg-black bg-opacity-20 text-white ">
        <div className="navbar-start">
          <Link to="/admin/dashboard">
            <p className="btn btn-ghost lg:text-xl ">DigiWallet Admin Panel</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          {currentAdmin ?<Button onClick={handleLogout} color="danger">Logout</Button> : null}
        </div>
      </div>
    </>
  );
};

export default AdminNav;
