import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Components/Sidebar';
import UserTable from '../../../Components/UserTable';
import UserDetailsModal from '../../../Components/UserDetailsModal';
import EditUserModal from '../../../Components/EditUserModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [isViewing, setViewing] = useState(false);
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
  
    const saveUser = (updatedUser) => {
      // Handle saving the updated user information here
      setSelectedUser(updatedUser);
      setEditing(false);


    };

    useEffect(()=>{

      const getUser = async () => {
        try {
          const res = await fetch('/api/admin/get-user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      

      
          const data = await res.json();
          console.log(data);
          if(!data.success) {
            toast.error(`Error: ${data.message}`);
            navigate('/admin/login');
            return;
          }

          setUsers(data.users);

          console.log(users);

          
      
        } catch (error) {
          console.error('Error fetching user:', error);
          toast.error(`Error: ${error.message}`);
        }
      };
      
      getUser();

    },[])
  
    return (
      <div className="flex h-[93vh]">
        <Sidebar />
        <div className="flex flex-col flex-grow p-4 space-x-4 lg:ml-64 ml-20">
          <UserTable setViewing={setViewing} users={users} setEditing={setEditing} setSelectedUser={(user) => { setSelectedUser(user); }} />
        </div>
        {isViewing && <UserDetailsModal user={selectedUser} setViewing={setViewing} setEditing={setEditing} />}
        {isEditing && <EditUserModal user={selectedUser} setEditing={setEditing} saveUser={saveUser} />}
      </div>
    );
  }

export default AdminDashboard;
