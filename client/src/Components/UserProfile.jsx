import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';
import { useFirebase } from '../store/firebaseContext';
import { toast } from 'react-toastify';
import validator from 'validator';
import {updateStart, updateSuccess, updateFailure} from '../Redux/user/slice'


const UserProfile = () => {

    const {currentUser} = useSelector((state) => state.user)
    const [image , setImage] = useState(false)
    const [url,setUrl] = useState("")
    const [formData, setFormData] = useState(currentUser.user);
    const {uploadFile} = useFirebase();
    const [saveButton, setSaveButton] = useState(true)
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const phoneRef = useRef();
    const profilePicRef = useRef();
    const {loading} = useSelector((state) => state.user)
    const dispatch = useDispatch();

  



    const handleChange = (e) => {
      setSaveButton(false)
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


  const imageInputHandle = (e) => {
    setImage(e.target.files[0]);
    setSaveButton(false)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
  
      let imageUrl = url; 
  
      if (image instanceof File) {
        imageUrl = await uploadFile(image);
        setUrl(imageUrl); 
      }
  
      if (!formData.name && !formData.email && !formData.password && !formData.confirmPassword && !formData.gender && !formData.phone) {
        toast.error("At least one field should be filled");
        dispatch(updateFailure());
        return;
      } else if (!formData.name || !formData.email) {
        toast.error("Name and email should not be empty");
        nameRef.current.style.border = "2px solid red";
        emailRef.current.style.border = "2px solid red";
        dispatch(updateFailure());
        return;
      } else if (!validator.isAlpha(formData.name)) {
        toast.error("Name shouldn't contain any special characters");
        nameRef.current.style.border = "2px solid red";
        dispatch(updateFailure());
        return;
      } else if (!validator.isEmail(formData.email)) {
        toast.error("Please enter a valid email");
        emailRef.current.style.border = "2px solid red";
        dispatch(updateFailure());
        return;
      } else if (formData.phone && !validator.isMobilePhone(formData.phone)) {
        toast.error("Please enter a valid phone number");
        phoneRef.current.style.border = "2px solid red";
        dispatch(updateFailure());
        return;
      } else if (formData.password || formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          passwordRef.current.style.border = "2px solid red";
          confirmPasswordRef.current.style.border = "2px solid red";
          dispatch(updateFailure());
          return;
        }
      }
  
      const data = await fetch("/api/user/updateProfile", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...formData, url: imageUrl }),
      });
  
      const result = await data.json();
      if (result.success) {
        console.log(result);
        dispatch(updateSuccess(result));
        toast.success(result.message);
      } else {
        toast.error(result.message);
        dispatch(updateFailure(result.message));
      }
  
    } catch (error) {
      dispatch(updateFailure(error));
      toast.error(error.message);
    }
  };


  return (
    <div className='h-screen '>
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg ">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <img
          className="w-24 h-24 rounded-full sm:w-32 sm:h-32"
          src={ image ? URL.createObjectURL(image) : formData?.profilePic}
          alt="Profile"
        />
        <div className="sm:ml-6 mt-4 sm:mt-0">
          <h2 className="text-2xl font-semibold">{formData?.name}</h2>
          <p className="text-gray-600">{formData?.email}</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="text"
              name="name"
              ref={nameRef}
              onChange={handleChange}
              value={formData.name}
              placeholder={formData.name}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="text"
              name="email"
              ref={emailRef}
              value={formData.email}
              onChange={handleChange}
              placeholder={formData.email}
              
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option>{formData?.gender}</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="text"
              name="phone"
              ref={phoneRef}
              placeholder={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="password"
              name="password"
              ref={passwordRef}
              onChange={handleChange}
              placeholder="password"
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="password"
              name="confirmPassword"
              ref={confirmPasswordRef}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <label className="block text-gray-700">Change Profile Picture  </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="file"
              name='profilePic'
              ref={profilePicRef}
              onChange={imageInputHandle}
              placeholder='Chose Profile Pic'
            />
          </div>
        </div>
        <div className='mt-6 items-center flex justify-center'>
          <Button
          onClick={handleSubmit}
          color={saveButton ? "default" : "danger"} disabled={saveButton} >{loading ? "Saving..." : "Save"}</Button>
          </div>
      </div>
      
    </div>

    </div>
  );
};

export default UserProfile;
