import React from 'react';
import UserDetailsModal from './UserDetailsModal';
import {Button} from "@nextui-org/react";



const UserTable = ({users, setSelectedUser , setViewing , setEditing}) => {

  return (
    <div className="flex-grow p-6  bg-blue-200 bg-opacity-20 backdrop-filter backdrop-blur-lg text-white shadow-md rounded-lg  ">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Button color="secondary">
        Add User
      </Button> 
      </div>
      <input type="text" placeholder="Search Person" className="mb-4 p-2 border rounded w-full" />
      <table className="w-full text-left table-auto rounded-lg">
        <thead>
          <tr className=''>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2 hidden md:table-cell">Email</th>
            <th className="px-4 py-2 hidden md:table-cell">Phone</th>
            <th className="px-4 py-2  md:table-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-800 hover:text-white  transition duration-200  cursor-pointer " onClick={() => setSelectedUser(user)}>
              <td className="border-b px-4 py-2">{user.name}</td>
              <td className="border-b px-4 py-2 hidden md:table-cell">{user.email}</td>
              <td className="border-b px-4 py-2 hidden md:table-cell">{user.phone}</td>
              <td onClick={() => setSelectedUser(user)} className="border-b px-4 py-2  md:table-cell "><UserDetailsModal user={user} setViewing={setViewing} setEditing={setEditing} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
