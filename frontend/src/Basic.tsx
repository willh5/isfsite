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



function Basic() {
    const [data, setData]=useState([])





    useEffect(()=> {
    axios.get('http://willh1.pythonanywhere.com/api/firms')
    .then(res=> setData(res.data.results))
    .catch(err => console.log(err));
    }, [])



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

export default Basic;


