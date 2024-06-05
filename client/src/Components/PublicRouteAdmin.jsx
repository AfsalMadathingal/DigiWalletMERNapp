import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate} from 'react-router-dom'

const PublicRouteAdmin = () => {

  const {currentUser} = useSelector((state) => state.admin)

  return ( currentUser ? <Navigate to="/admin/dashboard"/> : <Outlet/> )
  
}

export default PublicRouteAdmin
