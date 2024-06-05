import React, { useState } from "react";
import { toast } from "react-toastify";
import { Avatar, Button } from "@nextui-org/react";
import { useFirebase } from "../store/firebaseContext";
import ReactLoading from "react-loading";

const EditUserModal = ({ user, setEditing, saveUser }) => {
  const [formData, setFormData] = useState(user);
  const [loadin,setLoading] = useState(false)
  const [ image , setImage] = useState(null)
  const {uploadFile} = useFirebase();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveUser(formData);
  };

  const handleImageUpload = async (e) => {
 
    setLoading(true)
    const url = await uploadFile(image);
   
    setFormData({
      ...formData,
      profilePic: url,
    });

    setLoading(false)
    toast.success("Image uploaded successfully please Save");

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white xs:p-8 lg:p-8 rounded-lg shadow-md xs:w-1/1 lg:w-1/3">
        <h2 className="text-2xl text-center font-semibold mb-4">Edit User</h2>
        <div className="flex justify-center mb-4">
        <Avatar  src={image ? URL.createObjectURL(image) : formData.profilePic} className="w-20 h-20 text-large" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <label className="block text-gray-700">Profile Photo</label>
          <div className="mb-4 flex">
            
            <input
              type="file"
              name="profilePic"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full mr-5  border rounded"
            />
             <Button color="success" variant="ghost" className="mr-2"  onClick={(e) => handleImageUpload(e)}>
             <i className="fa-solid fa-upload"></i> {loadin ? <ReactLoading type="spin" color="black" height={20} width={20} /> : "Upload"} 
            </Button>
          </div>
          <div className="flex justify-end">
        
            <Button color="secondary" variant="ghost" className="mr-2"  onClick={() => setEditing(false)}>
              close
            </Button>
            <Button color="danger" onClick={handleSubmit} type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
