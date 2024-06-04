import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate} from 'react-router-dom'

const PublicRoute = () => {

  const {currentUser} = useSelector((state) => state.user)

  return ( currentUser ? <Navigate to="/dashboard"/> : <Outlet/> )
  
}

export default PublicRoute
