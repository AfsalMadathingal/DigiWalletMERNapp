import React, { useState } from 'react';

const EditUserModal = ({ user, setEditing, saveUser }) => {

  const [formData, setFormData] = useState(user);

  console.log('====================================');
  console.log("user",user);
  console.log('====================================');
  console.log('====================================');
  console.log(formData);
  console.log('====================================');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => setEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
