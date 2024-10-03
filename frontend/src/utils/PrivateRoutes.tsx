// @ts-nocheck

import { Route, Outlet } from 'react-router-dom'
import React, {useContext} from 'react'

import { Navigate } from "react-router-dom";

import AuthContext from '../context/AuthContext'


const PrivateRoutes = () => {



    let {user} = useContext(AuthContext)



    return(
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;





