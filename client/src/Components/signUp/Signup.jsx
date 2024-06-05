import React, { useReducer, useRef, useState } from "react";
import { FaGoogle, FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import useGoogleAuth from "../../hook/GoogleAuth";
import { signInStart , signInSuccess, signInFailure } from '../../Redux/user/slice'
import { useDispatch ,useSelector } from 'react-redux'

const SignupPage = () => {
  const [formData, setFormData] = useState({});
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  const  {signInWithGoogle} = useGoogleAuth()
  const {loading} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleGoogleLogin = async () => {

    try {
  
      dispatch(signInStart())
  
      const result = await signInWithGoogle();
  
      if (!result) return toast.error("Login Failed");
  
      const apiResult = await fetch('/api/auth/google',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          result})
      })
  
      const data = await apiResult.json()
  
      console.log(data);
     
      dispatch(signInSuccess(result))
      
    } catch (error) {
  
      toast.error(error.message)
    }
  
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.name
    ) {
      nameRef.current.style.border = "2px solid red";
      emailRef.current.style.border = "2px solid red";
      passwordRef.current.style.border = "2px solid red";
      confirmPasswordRef.current.style.border = "2px solid red";
      toast.error("Please fill all the fields");
      return;
    } else if (validator.isAlpha(formData.name) === false) {
      nameRef.current.style.border = "2px solid red";
      setNameError(true);
      toast.error("Name shoudn't contain any special characters");
      return;
    } else if (!validator.isEmail(formData.email)) {
      emailRef.current.style.border = "2px solid red";
      toast.error("Please enter a valid email");
      setEmailError(true);
      return;
    } else if (formData.password !== formData.confirmPassword) {
      passwordRef.current.value = "";
      passwordRef.current.style.border = "2px solid red";
      confirmPasswordRef.current.value = "";
      confirmPasswordRef.current.style.border = "2px solid red";
      setPasswordError(true);
      setConfirmPasswordError(true);
      toast.error("Passwords do not match");
      return;
    }

    dispatch(signInStart())

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      

      const data = await res.json();

      dispatch(signInSuccess(res))

      if (!data?.success) {

        setEmailError(true);
        toast.error("something went wrong");

        return
      }

      navigate('/login')
      toast("Sign Up Successful");

    } catch (error) {
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="flex justify-center lg:pt-20 h-screen grad-bg">
        <div className="w-96 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-md rounded-lg px-8 py-6 pb-0 m-5 xs:h-[680px] lg:h-[700px]">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            {nameError && <p className="text-red-500">No special characters</p>}
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-gray-50">
              <i className="fa-solid fa-user"></i>
              <input
                ref={nameRef}
                id="name"
                name="name"
                onChange={handleChange}
                type="text"
                className="w-full border-none focus-rounded outline-none bg-transparent ml-3 rounded"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            {emailError && (
              <p className="text-red-500">Email Already Exists or Not Valid</p>
            )}
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-gray-50">
              <svg
                height="20"
                viewBox="0 0 32 32"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer_3" data-name="Layer 3">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                </g>
              </svg>
              <input
                ref={emailRef}
                id="email"
                name="email"
                onChange={handleChange}
                type="text"
                className="w-full border-none focus-rounded outline-none bg-transparent ml-3"
                placeholder="Enter your Email"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            {passwordError && (
              <p className="text-red-500">Passwords Do Not Match</p>
            )}
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-gray-50 relative">
              <svg
                height="20"
                viewBox="-64 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                ref={passwordRef}
                id="password"
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full border-none focus-rounded outline-none bg-transparent ml-3"
                placeholder="Enter your Password"
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            {passwordError && (
              <p className="text-red-500">Passwords Do Not Match</p>
            )}
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-gray-50 relative">
              <svg
                height="20"
                viewBox="-64 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                ref={confirmPasswordRef}
                id="confirmPassword"
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border-none focus-rounded outline-none bg-transparent ml-3"
                placeholder="Confirm your Password"
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 btn-grad"
          >
            {loading ? (
              <ReactLoading
                type="bars"
                height="25px"
                width="25px"
                color="white"
              />
            ) : (
              "Sign Up"
            )}
          </button>
          <Link to="/login" className="text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <a href="#" className="text-blue-500">
              Sign In
            </a>
          </Link>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">Or With</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-between">
            <button onClick={handleGoogleLogin} className="flex items-center justify-center w-full py-2 mr-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200">
              <FaGoogle className="mr-2" /> Google
            </button>
            <button className="flex items-center justify-center w-full py-2 ml-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200">
              <FaApple className="mr-2" /> Apple
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
