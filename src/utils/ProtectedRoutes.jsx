import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider';
const ProtectedRoutes = ()=>{
   const {user}=useAuth();
    const resident = user;
    return resident ? <Outlet/> : <Navigate to="/"/>;
}
export default ProtectedRoutes;