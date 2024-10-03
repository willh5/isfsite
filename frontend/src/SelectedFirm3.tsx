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


import styled from "styled-components";



function SelectedFirm3({selected}) {


    let { authTokens } = useContext(AuthContext)
    const [scope3, setScope1]=useState([])


    useEffect(()=> {
        fetchScope3()
    })


    const fetchScope3 = async() => {



        const endpoint = `http://willh1.pythonanywhere.com/api/firms/${selected.id}/scope3`

        try{
            const response = await fetch(endpoint,{
                method:'GET',
                headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
                }
            })


            const dataf = await response.json()
            setScope3(dataf)

        }catch (e){
        console.log(e)
        }

        }


    return (


            <div className='p-5 bg-light'>
                <div className='bg-white shadow border'>
                {selected.name}
                <span> | </span>
                Scope 3
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Source</th>
                                <th>Value</th>
                                <th>Unit</th>
                                <th>Metric</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scope3.map((d,i) => (
                                <tr key={i}>
                                    <td>{d.date}</td>
                                    <td>{d.source}</td>
                                    <td>{d.value}</td>
                                    <td>{d.unit}</td>
                                    <td>{d.metric}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>

             )
            }
    export default SelectedFirm3;