// @ts-nocheck
import React from 'react';
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Firm, columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import { useQuery } from '@tanstack/react-query';
import {useFirms} from "./firmcall"
import AuthContext from '../context/AuthContext'


function FirmData() {


    let {authTokens, logoutUser} = useContext(AuthContext)
    const [data, setData]=useState([])
    const [fdata, setFdata]=useState([])
    const [searchText, setSearchText]=useState("")


    useEffect(()=> {
        fetchData()
    }, [searchText])

    const fetchData = async() => {

    const endpoint = 'http://willh1.pythonanywhere.com/api/firms/?search=${searchText}'

    try{
        const response = await fetch(endpoint,{
            method:'GET',
            headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
            }
        })

        const datas = await response.json()
        setData(datas)
    }catch (e){
    console.log(e)
    }

    }






    return (
    <div className='p-5 bg-light'>
        <div className='bg-white shadow border'>
            <input type="search" className='form-control' value={searchText} onChange={e=> setSearchText(e.target.value)} placeholder="Search" />
            <table className='table'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>sector</th>
                        <th>hq location</th>
                    </tr>
                </thead>
                <tbody>
                    {fdata.map((d,i) => (
                        <tr key={i}>
                            <td>{d.name}</td>
                            <td>{d.sector}</td>
                            <td>{d.hq_location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     </div>
    );
}

export default FirmData;


