// @ts-nocheck
import React from 'react';
import { useState, useEffect, useContext } from 'react'
import AuthContext from './context/AuthContext'
import axios from 'axios'
import './App.css';
import { Firm, columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import { useQuery } from '@tanstack/react-query';
import {useFirms} from "./firmcall"






function BasicSecNames() {


    let { authTokens } = useContext(AuthContext)
    const [data, setData]=useState([])
    const [searchText, setSearchText]=useState("")
    const [sectorData, setSectorData]=useState(null)



    useEffect(()=> {
        console.log("success 0.0")
        fetchSectorData()
    }, [])





    const fetchSectorData = async() => {


        console.log("success 2.2")

        const endpoint2 = `http://willh1.pythonanywhere.com/api/sectors`

        try{
            const response = await fetch(endpoint2,{
                method:'GET',
                headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            console.log("success 3")

            const dataq = await response.json()

            setSectorData(dataq)
        }catch (e){
        console.log(e)
        }

        }





    return (
    <div className='p-5 bg-light'>
        <div className='bg-white shadow border'>
             <select onChange={(e) => {console.log(e.target.value)}}>
                {sectorData ? sectorData.map((sd) => {
                return(
                    <option key={sd.id} value={sd.id}>
                        {sd.name}
                    </option>
                );
                }) : null}
            </select>
            <table className='table'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>sector</th>
                        <th>hq location</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
     </div>
    );
}

export default BasicSecNames;


