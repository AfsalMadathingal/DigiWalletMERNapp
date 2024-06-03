import React, { useEffect } from 'react'
import Header from '../../Components/Header'
import LoginForm from '../../Components/Login/LoginForm'

const Login = () => {


  useEffect(()=>{
      document.title = "Sign In"
  },[])


  return (
    <>
    <div>
        <LoginForm/>
    </div>
    </>
  )
}

export default Login
