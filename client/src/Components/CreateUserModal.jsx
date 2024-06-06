import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, Button } from "@nextui-org/react";
import { useFirebase } from "../store/firebaseContext";
import ReactLoading from "react-loading";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import validator from "validator";

const CreateUserModal = ({ createUser, setCreating, saveUser }) => {
  const [formData, setFormData] = useState({});
  const [loadin,setLoading] = useState(false)
  const [ image , setImage] = useState(null)
  const {uploadFile} = useFirebase();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword){
      nameRef.current.style.border = "1px solid red";
      emailRef.current.style.border = "1px solid red";
      phoneRef.current.style.border = "1px solid red";
      passwordRef.current.style.border = "1px solid red";
      confirmPasswordRef.current.style.border = "1px solid red";
      toast.error("field should not be empty") 
      return
    }else if(!validator.isAlpha(formData.name)){
      nameRef.current.style.border = "1px solid red";
      toast.error("name should be alphabetic") 
      return
    }else if(!validator.isEmail(formData.email)){
      emailRef.current.style.border = "1px solid red";
      toast.error("invalid email") 
      return
    }else if(!validator.isMobilePhone(formData.phone)){
      phoneRef.current.style.border = "1px solid red";
      toast.error("invalid phone") 
      return
    }else if(formData.password !== formData.confirmPassword){
      passwordRef.current.style.border = "1px solid red";
      confirmPasswordRef.current.style.border = "1px solid red";
      toast.error("password and confirm password should be same") 
      return
    }
    createUser(formData);
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
      <div className="bg-white xs:p-8 lg:p-8 rounded-lg shadow-md xs:w-1/1 lg:w-1/3 ">
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
              ref={nameRef}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              ref={phoneRef}
              name="phone"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              ref={passwordRef}
              name="password"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              ref={confirmPasswordRef}
              name="confirmPassword"
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
        
            <Button color="secondary" variant="ghost" className="mr-2"  onClick={() => setCreating(false)}>
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

export default CreateUserModal;
