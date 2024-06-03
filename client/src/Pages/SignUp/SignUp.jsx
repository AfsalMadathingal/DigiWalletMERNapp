import React, { useEffect } from 'react'
import SignupPage from '../../Components/signUp/Signup'
import Header from '../../Components/Header'

const SignUp = () => {

  useEffect(()=>{
      document.title = "Sign Up"
  },[])

  return (
   <>
   <SignupPage/>
   </>
  )
}

export default SignUp
