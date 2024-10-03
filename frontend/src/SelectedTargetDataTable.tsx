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



function SelectedTargetDataTable({selectedTarget, needsUpdate, setNeedsUpdate}) {
    const [tdata,setTdata] = useState(selectedTarget.data)


    useEffect(()=> {
        if(needsUpdate === "1"){
        setTdata(selectedTarget.data);
        setNeedsUpdate("0")}
    }, [needsUpdate])




    return (<>


                <div className='p-5 bg-light'>
                    <div className='bg-white shadow border'>
                    Target {selectedTarget.reference_number}
                    <span> | </span>
                    Data
                        <table className='table'>
                            <thead class="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th class="p-3 text-sm tracking-wide text-left">Date</th>
                                    <th class="p-3 text-sm tracking-wide text-left">Base year</th>
                                    <th class="p-3 text-sm tracking-wide text-left">Target year</th>
                                    <th class="p-3 text-sm tracking-wide text-left">Targeted reduction (%)</th>
                                    <th class="p-3 text-sm tracking-wide text-left">% of total emissions targeted</th>
                                    <th class="p-3 text-sm tracking-wide text-left">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {tdata.map((d,i) => (

                                    <tr key={i}>
                                        <td class="p-0 text-center text-sm text-gray-700">{d.publication_date}</td>
                                        <td class="p-0 text-center text-sm text-gray-700">{d.base_year}</td>
                                        <td class="p-0 text-center text-sm text-gray-700">{d.target_year}</td>
                                        <td class="p-0 text-center text-sm text-gray-700">{d.targeted_reduction}</td>
                                        <td class="p-0 text-center text-sm text-gray-700">{d.percent_of_total}</td>
                                        <td class="p-0 text-center text-sm text-gray-700">{d.status}</td>


                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                 </div>
            </>

             )
            }
    export default SelectedTargetDataTable;