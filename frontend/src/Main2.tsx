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



function Main2() {

    let { authTokens } = useContext(AuthContext)
    const [searchText, setSearchText]=useState("")

    const [data, setData]=useState([])
    const [fdata, setFdata]=useState([])






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










    const deb = useDebounce(searchText, 500)




    const fetchData = async() => {
        const endpoint = `http://willh1.pythonanywhere.com/api/firms/?name__icontains=${searchText}`
        let response = await fetch(endpoint, {
            method:'GET',
            headers:{
                'Content-Type':'applcation/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let datas=response.results.json()
        setData(datas)
    }

    useEffect(()=>{

        const endpointTwo = 'http://willh1.pythonanywhere.com/api/firms/?name__icontains='
        fetch(endpointTwo, {
            method:'GET',
            headers:{
                'Content-Type':'applcation/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        .then(res=> setData(res.results))
        .catch(err => console.log(err));
        },[])





    useEffect(()=> {
        fetchData()
    }, [deb])












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

export default Main2;


