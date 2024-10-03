// @ts-nocheck


import './App.css';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

import { Firm, columns } from "./components/columns"
import { DataTable } from "./components/data-table"



import FirmEx3 from "./FirmEx3";



import BasicSecNames from "./BasicSecNames";
import FirmData from "./pages/FirmData";
import Logout from "./components/Logout";
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage'
import FirmTargets from './pages/FirmTargets'

import { Link, Routes, Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Header from './components/Header'
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import AuthContext from './context/AuthContext'
import { Button } from 'react-bootstrap'


function App() {
const nav = useNavigate()



  return (

    <AuthProvider>

    <div class="max-w rounded overflow-hidden shadow-lg">
      <div style={{}}>
        <div style={{float: 'right'}}>
            <Logout/>
        </div>
           <div style={{clear: 'both'}}></div>
            <div>

                <div className='p-1 bg-light w-fit'>
                    <div className='p-3 bg-white shadow border'>
                        <span></span>
                        <Link to="/">
                            <button class="bg-cyan-800 hover:bg-cyan-950 text-xs text-stone-100 py-2 px-3 rounded inline-flex items-center">
                                Home
                            </button>
                        </Link>
                        <span> | </span>
                        <Link to="/data">
                            <button class="bg-cyan-800 hover:bg-cyan-950 text-xs text-stone-100 py-2 px-3 rounded inline-flex items-center">
                                Firm data
                            </button>
                        </Link>
                        <span> | </span>
                        <Link to="/login">
                            <button class="bg-cyan-800 hover:bg-cyan-950 text-xs text-stone-100 py-2 px-3 rounded inline-flex items-center">
                                Log in
                            </button>
                        </Link>
                    </div>
                </div>

            <div class="p-6">








            <Routes>

                <Route element={<LoginPage/>} path="/login" />
                <Route element={<Home/>} path="/" />
                <Route element={<PrivateRoutes/>}>
                    <Route element={<FirmEx3/>} path="/data" />

                </Route>
            </Routes>
            </div>


         </div>
      </div>
    </div>
    </AuthProvider>
    );
}

export default App;

