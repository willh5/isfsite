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



function Main() {

    let {authTokens} = useContext(AuthContext)

    const useDebounce = (val, delay) => {
        const [debounceVal, setDebounceVal] = useState(val)
        useEffect(()=>{
            const handler = setTimeout(() => {
                setDebounceVal(val)
            }, delay);

            return () => {
            clearTimeout(handler);
            };

        }, [val]);
        return debounceVal;

    };








    const [searchText, setSearchText]=useState("")

    const [data, setData]=useState([])

    const deb = useDebounce(searchText, 500)




    const fetchData = async() => {
        const endpoint = `http://willh1.pythonanywhere.com/api/firms/?name__icontains=${searchText}`
        try{
            const response = await fetch(endpoint,{
            method:'GET',
            headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
            }
        })

        const datas = await response.json().results
        setData(datas)
    }
    catch (e){
    console.log(e)
    }

    }

    useEffect(()=> {
        fetchData()
    }, [deb])





     useEffect(()=>{
    fetchData()



    },[])




    return (
    <div className='p-5 bg-light'>
        <div className='bg-white shadow border'>
            <input type="search" value={searchText} onChange={e=> setSearchText(e.target.value)} placeholder="Search" />
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

export default Main;


