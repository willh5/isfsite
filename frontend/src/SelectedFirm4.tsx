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
import SelectedTargetDataTable from "./SelectedTargetDataTable"



function SelectedFirm4({selected, needFetch, setNeedFetch}) {


    let { authTokens } = useContext(AuthContext)
    const [targets, setTargets]=useState([])
    const [selectedTarget, setSelectedTarget]=useState(null)
    const [needsUpdate, setNeedsUpdate]=useState("0")

    useEffect(()=> {
        if(needFetch === "1"){fetchTargets()}
    }, [needFetch])


    const fetchTargets = async() => {



        const endpoint = `http://willh1.pythonanywhere.com/api/firms/${selected.id}/targetlist`

        try{
            const response = await fetch(endpoint,{
                method:'GET',
                headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
                }
            })


            const dataf = await response.json()
            setTargets(dataf)
            setNeedFetch("0")

        }catch (e){
        console.log(e)
        }

        }


    return (
            <>

                <div className='p-5 bg-light'>
                    <div className='bg-white shadow border'>
                    {selected.name}
                    <span> | </span>
                    Firm Targets
                        <table className='table'>
                            <thead class="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th class="p-3 text-sm tracking-wide text-left">Date Set</th>
                                    <th class="p-3 text-sm tracking-wide text-left">Target ID</th>
                                    <th class="p-3 text-sm tracking-wide text-left">Scope</th>
                                    <th class="p-3 text-sm tracking-wide text-left">Status</th>


                                </tr>
                            </thead>
                            <tbody>
                                {targets.map((t,i) => (
                                    <tr key={i}>
                                        <td class="p-1 text-center text-sm text-gray-700">{t.date_set}</td>
                                        <td class="p-1 text-center text-sm text-gray-700">{t.reference_number}</td>
                                        <td class="p-1 text-center text-sm text-gray-700">{t.scope}</td>
                                        <td class="p-1 text-center text-sm text-gray-700">{t.status}</td>
                                        <td class="p-1 text-center text-sm text-gray-700"><button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setSelectedTarget(t); setNeedsUpdate("1")}}>Load</button></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                  {selectedTarget && <SelectedTargetDataTable selectedTarget={selectedTarget}
                  needsUpdate={needsUpdate} setNeedsUpdate={setNeedsUpdate}/>}
                </div>

            </>
             )
            }
    export default SelectedFirm4;