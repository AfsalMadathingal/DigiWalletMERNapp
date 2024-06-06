import React from 'react';
import { useSelector } from 'react-redux';



const UserProfile = () => {

    const {currentUser} = useSelector((state) => state.user)
    const {user} = currentUser
    console.log(user)

  return (
    <div className='h-screen '>
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg ">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <img
          className="w-24 h-24 rounded-full sm:w-32 sm:h-32"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div className="sm:ml-6 mt-4 sm:mt-0">
          <h2 className="text-2xl font-semibold">Alexa Rawles</h2>
          <p className="text-gray-600">alexarawles@gmail.com</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="text"
              placeholder="Your First Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Nick Name</label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="text"
              placeholder="Your First Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option>Your First Name</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Country</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option>Your First Name</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Language</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option>Your First Name</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Time Zone</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option>Your First Name</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">My email Address</h3>
        <div className="mt-2 flex items-center">
          <input
            type="radio"
            name="email"
            className="mr-2"
            checked
            readOnly
          />
          <div>
            <p>alexarawles@gmail.com</p>
            <p className="text-gray-600 text-sm">1 month ago</p>
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm">
          + Add Email Address
        </button>
      </div>
    </div>

    </div>
  );
};

export default UserProfile;
