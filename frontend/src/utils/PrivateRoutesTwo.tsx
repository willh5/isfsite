
// @ts-nocheck
import React, { useContext } from 'react'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'
import { AuthContextTwo } from '../context/AuthContextTwo'


const PrivateRoutesTwo = () => {



    const { authenticated } = useContext(AuthContextTwo)
    if(!authenticated) return <Navigate to='/login' replace />
    return <Outlet />


}