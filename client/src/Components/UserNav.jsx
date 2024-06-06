import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function UserNav() {

  const {currentUser} = useSelector((state) => state.user)
  const navigate = useNavigate()

  console.log(currentUser);

  const handleLogout = () => {
    try {
      localStorage.clear();
      localStorage.removeItem('token');
      toast.success("Logged Out Successfully");
      navigate("/")
    
    } catch (error) {
      
      toast.error(`Error: ${error.message}`);
    }
  }

  let user = currentUser.others

  user = user? user : currentUser.user

  console.log("user from nav",user);


  return (
    <Navbar className="bg-[#0a0a0a] z-10 opacity-100 text-white" variant="sticky" >
      <NavbarBrand>
       
        <p className="font-bold ">DigiWallet</p>
      </NavbarBrand>

      <NavbarContent className="hidden text-white z-20 sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="white" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="#" aria-current="page" color="white">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="white" href="#">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={user?.profilePic}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem onClick={handleLogout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}


