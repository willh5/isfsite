// @ts-nocheck
import React, {useContext} from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Firm, columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import { useQuery } from '@tanstack/react-query';
import {useFirms} from "./firmcall"
import AuthContext from '../context/AuthContext'


function Home() {

    let {user} = useContext(AuthContext)


    return (
    <>
    <p>Welcome{user &&<>, {user.username}.</>} </p>
    <p></p>
    <p>This site serves as a platform for ISF's data and data-based projects. </p>




    </>
    );
}

export default Home;


