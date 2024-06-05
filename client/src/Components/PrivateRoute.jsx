import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate} from 'react-router-dom'

const PrivateRouteAdmin = () => {

  const {currentAdmin} = useSelector((state) => state.admin)

  return ( currentAdmin ? <Outlet/> : <Navigate to="/admin/login"/>)
  
}

export default PrivateRouteAdmin
