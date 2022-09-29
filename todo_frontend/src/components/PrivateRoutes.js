import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from "../custom_hooks/useAuth"

function PrivateRoutes() {
    const {auth}=useAuth()

    if(auth===undefined)
        return "Loading..."
    
    return auth===true ? <Outlet /> : < Navigate to="/auth" />
}

export default PrivateRoutes