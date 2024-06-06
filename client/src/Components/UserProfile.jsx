import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';
import { useFirebase } from '../store/firebaseContext';
import { toast } from 'react-toastify';
import validator from 'validator';
import {updateStart, updateSuccess, updateFailure} from '../Redux/user/slice'


const UserProfile = () => {

    const {currentUser} = useSelector((state) => state.user)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [image , setImage] = useState(null)
    const [formData, setFormData] = useState(currentUser.user);
    const {uploadFile} = useFirebase();
    const [saveButton, setSaveButton] = useState(true)
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const phoneRef = useRef();
    const genderRef = useRef();
    const {loading} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    


    const {user} = currentUser

    console.log("currentUser",currentUser);
    console.log("form",formData);

    const handleChange = (e) => {
      setSaveButton(false)
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
   
      dispatch(updateStart())
      if(image){
       const  url = await uploadFile(image);
       setFormData({ 
        ...formData,
        profilePic: url,
      });
      }

      
      if(!formData.name && !formData.email  && !formData.password && !formData.confirmPassword && !formData.gender && !formData.phone){
        toast.error("At least one field should be filled") 
        return
      }else if(!formData.name || !formData.email){
        toast.error("Name and email should not be empty")
        nameRef.current.style.border = "2px solid red"
        emailRef.current.style.border = "2px solid red"
        return
      }else if(!validator.isAlpha(formData.name)){
        toast.error("Name shoudn't contain any special characters")
        nameRef.current.style.border = "2px solid red"
        return
      }else if(!validator.isEmail(formData.email)){
        toast.error("Please enter a valid email")
        emailRef.current.style.border = "2px solid red"
        return
      }else if( formData.phone && !validator.isMobilePhone(formData.phone)){

        toast.error("Please enter a valid phone number")
        phoneRef.current.style.border = "2px solid red"
        return

      } else if( formData.password || formData.confirmPassword){

        if(formData.password !== formData.confirmPassword){
          toast.error("Passwords do not match")
          toast.error("Passwords do not match")
        passwordRef.current.style.border = "2px solid red"
        confirmPasswordRef.current.style.border = "2px solid red"
        return
        }
      
      }

      const data = await fetch("/api/user/updateProfile", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      const result = await data.json();
      if(result.success){
        console.log(result);
        dispatch(updateSuccess(result))
        toast.success(result.message)
      }else{
        toast.error(result.message)
      }
      
    };



  return (
    <div className='h-screen '>
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg ">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <img
          className="w-24 h-24 rounded-full sm:w-32 sm:h-32"
          src={ image ? URL.createObjectURL(image) : user?.profilePic}
          alt="Profile"
        />
        <div className="sm:ml-6 mt-4 sm:mt-0">
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
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
              placeholder="Your First Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="text"
              name="email"
              ref={emailRef}
              onChange={handleChange}
              value={formData.email}
              placeholder="Your First Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option>{user?.gender}</option>
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
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your  Phone Number"
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
              placeholder="Your  Phone Number"
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
              placeholder="Your  Phone Number"
            />
          </div>
          <div>
            <label className="block text-gray-700">Change Profile Picture  </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              type="file"
              name='profilePic'
              onChange={(e) => setImage(e.target.files[0])}
              placeholder="Your  Phone Number"
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
