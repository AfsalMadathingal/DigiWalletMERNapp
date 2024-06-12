import React, { useRef, useState } from "react";
import { FaGoogle, FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import ReactLoading from "react-loading";
import { signInStart , signInSuccess, signInFailure } from '../../Redux/user/slice'
import { useDispatch ,useSelector } from 'react-redux'
import useGoogleAuth from "../../hook/GoogleAuth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading} = useSelector(state => state.user)
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {signInWithGoogle} = useGoogleAuth()


  const handleLogin = async (e) => {
    try {
      dispatch(signInStart())
      if (!email || !password) {
        toast.error("Please fill all the fields");
        emailRef.current.style.border = "2px solid red";
        passwordRef.current.style.border = "2px solid red";
        dispatch(signInFailure())
  
        return;
      } else if (!validator.isEmail(email)) {
        toast.error("Please enter a valid email");
        emailRef.current.style.border = "2px solid red";
        dispatch(signInFailure())
        return;
      }
  
      const data = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const res = await data.json();

      console.log(res)

      if (!res.success){

        toast.error(res.message)
        dispatch(signInFailure())

        return

      } 
  
      toast.success("Welcome Back");
      navigate("/dashboard");
      dispatch(signInSuccess(res))
      
    } catch (error) {
      
      toast.error(error.message)
      dispatch(signInFailure())
    }
    
  }; 


  const handleGoogleLogin = async () => {

  try {

    dispatch(signInStart())

    const result = await signInWithGoogle();



    if (!result) {
      toast.error("Something went wrong");
      dispatch(signInFailure())
      return 
    }

    const apiResult = await fetch('/api/auth/google',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        result})
    })

    const data = await apiResult.json()
    
    if(!data.success) return toast.error(data.message); dispatch(signInFailure())
    
    toast.success("Welcome Back");

    navigate("/dashboard");

    console.log(data);
   
    dispatch(signInSuccess(data))
    
  } catch (error) {
    dispatch(signInFailure())
    toast.error(error.message)
  }

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex z-1 justify-center   h-screen grad-bg  ">
      <div className="w-full xs:h-[550px] xs:mt-[50px] lg:h-[550px] lg:mt-24 max-w-md bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-gray-50">
            <svg
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
            <input
              ref={emailRef}
              type="text"
              className="w-full border-none outline-none bg-transparent ml-3"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
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
              type={showPassword ? "text" : "password"}
              className="w-full border-none outline-none bg-transparent ml-3"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-500 text-sm">
            Forgot password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-500 text-white rounded-lg transition duration-200 btn-grad"
        >
          {loading ? (
            <ReactLoading type="bars" color="white" height={25} width={25} />
          ) : (
            "Login"
          )}
        </button>

        <Link to="/signup" className="text-sm text-gray-700 mt-4">
          <p className="text-sm text-gray-700 mt-4">
            Don't have an account?{" "}
            <span className="text-blue-500 ">Sign Up</span>
          </p>
        </Link>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">Or With</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-between">
          <button onClick={handleGoogleLogin}  className="flex items-center justify-center w-full py-2 mr-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200">
            <FaGoogle  className="mr-2" /> Google
          </button>
          <button className="flex items-center justify-center w-full py-2 ml-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200">
            <FaApple className="mr-2" /> Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
