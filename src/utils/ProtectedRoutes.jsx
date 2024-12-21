import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const ProtectedRoutes = ()=>{
   
    const resident = true;
    return resident ? <Outlet/> : <Navigate to="/"/>;
}
export default ProtectedRoutes;