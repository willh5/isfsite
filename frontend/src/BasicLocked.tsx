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






function BasicLocked() {


    let { authTokens } = useContext(AuthContext)
    const [data, setData]=useState([])
    const [searchText, setSearchText]=useState("")




    useEffect(()=> {
    console.log("success 1")
    fetchDataTwo()
    }, [])





    const fetchDataTwo = async() => {
        setSearchText("")
        console.log("success 2")

        const endpoint = `http://willh1.pythonanywhere.com/api/firms/?name__icontains=${searchText}`

        try{
            const response = await fetch(endpoint,{
                method:'GET',
                headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            console.log("success 3")

            const datas = await response.json()
            setData(datas.results)
        }catch (e){
        console.log(e)
        }

        }





    return (
    <div className='p-5 bg-light'>
        <div className='bg-white shadow border'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>sector</th>
                        <th>hq location</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d,i) => (
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

export default BasicLocked;


