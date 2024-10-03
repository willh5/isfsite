// @ts-nocheck

import { Route, Outlet } from 'react-router-dom'
import React, {useContext} from 'react'

import { Navigate } from "react-router-dom";



const PrivateRoutes = () => {
    let auth = {'token':true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}




const PrivateRoute = ({ children }) => {
    let {user} = useContext(AuthContext)

  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;





