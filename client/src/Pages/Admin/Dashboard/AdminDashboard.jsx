import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/Sidebar";
import UserTable from "../../../Components/UserTable";
import EditUserModal from "../../../Components/EditUserModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updatingUserStart,
  updatingUserSuccess,
  updatingUserFailure,
} from "../../../Redux/admin/adminSlice";

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [isViewing, setViewing] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { loading, updating } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const saveUser = async (updatedUser) => {
    setSelectedUser(updatedUser);
    setEditing(false);
    dispatch(updatingUserStart());
    try {
      const res = await fetch("/api/admin/edit-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const response = await res.json();

      if (!response.success) return toast.error(`Error: ${response.message}`);

      toast.success("User Edited Successfully");
      dispatch(updatingUserSuccess(response));
    } catch (error) {
      dispatch(updatingUserFailure(error.message));
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/admin/get-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log(data);
        if (!data.success) {
          toast.error(`Error: ${data.message}`);
          navigate("/admin/login");
          return;
        }

        setUsers(data.users);

        console.log(users);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(`Error: ${error.message}`);
      }
    };

    getUser();
  }, [updating]);

  return (
    <div className="flex h-[93vh]">
      <Sidebar />
      <div className="flex flex-col flex-grow p-4 space-x-4 lg:ml-64 ml-20">
        <UserTable
          setViewing={setViewing}
          users={users}
          setEditing={setEditing}
          setSelectedUser={(user) => {
            setSelectedUser(user);
          }}
        />
      </div>
      {isEditing && (
        <EditUserModal
          user={selectedUser}
          setSelectedUser={setSelectedUser}
          setEditing={setEditing}
          saveUser={saveUser}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
