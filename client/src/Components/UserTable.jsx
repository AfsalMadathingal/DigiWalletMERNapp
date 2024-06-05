import React, { useState } from "react";
import UserDetailsModal from "./UserDetailsModal";
import { Button, user } from "@nextui-org/react";
import DarkModeConfirmAlert from "./DarkModeConfirmAlert";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatingUserFailure, updatingUserStart, updatingUserSuccess } from "../Redux/admin/adminSlice";

const UserTable = ({ users, setSelectedUser, setViewing, setEditing }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const {updating} = useSelector(state => state.admin)
  const dispatch = useDispatch();


  const handleConfirm = async (user) => {
    setIsAlertVisible(false);
    dispatch(updatingUserStart());
    console.log(user);
    try {
      
      const res = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

    if (data.success) {
      toast.success('User deleted successfully');
      dispatch(updatingUserSuccess(data));
    } else {
      toast.error(`Error: ${data.message}`);
      dispatch(updatingUserFailure(data.message));
    }
    } catch (error) {

      toast.error(`Error: ${error.message}`);
    }

    
    
  };

  const handleCancel = () => {
    setIsAlertVisible(false);
  };

  return (
    <div className="flex-grow p-6  bg-blue-200 bg-opacity-20 backdrop-filter backdrop-blur-lg text-white shadow-md rounded-lg  ">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Button color="secondary">Add User</Button>
      </div>
      <input
        type="text"
        placeholder="Search Person"
        className="mb-4 p-2 border rounded w-full"
      />
      <table className="w-full text-left table-auto rounded-lg">
        <thead>
          <tr className="">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2 hidden md:table-cell">Email</th>
            <th className="px-4 py-2 hidden md:table-cell">Phone</th>
            <th className="px-4 py-2  md:table-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="hover:bg-gray-800 hover:text-white  transition duration-200  cursor-pointer "
              onClick={() => setSelectedUser(user)}
            >
              <td className="border-b px-4 py-2">{user.name}</td>
              <td className="border-b px-4 py-2 hidden md:table-cell">
                {user.email}
              </td>
              <td className="border-b px-4 py-2 hidden md:table-cell">
                {user.phone}
              </td>
              <td className="border-b px-4 py-2   md:table-cell ">
                <UserDetailsModal
                  setSelectedUser={setSelectedUser}
                  user={user}
                  setViewing={setViewing}
                  setEditing={setEditing}
                />

                <Button
                  className="ml-2"
                  onClick={() => setIsAlertVisible(true)}
                  color="danger"
                >
                  Delete User
                </Button>
                {isAlertVisible && (
                  <DarkModeConfirmAlert
                    message="Are you sure you want to proceed?"
                    onConfirm={() => handleConfirm(user)}
                    onCancel={handleCancel}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
