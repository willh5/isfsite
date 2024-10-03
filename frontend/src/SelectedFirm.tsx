// @ts-nocheck
import React from 'react';
import { useState, useEffect, useContext } from 'react'
import AuthContext from './context/AuthContext'
import axios from 'axios'
import './App.css';



import {useFirms} from "./firmcall"


import styled from "styled-components";

import Graph1 from "./Graph1"



function SelectedFirm({selected, needFetch, setNeedFetch}) {


    let { authTokens } = useContext(AuthContext)
    const [scope1, setScope1]=useState([])
    const [scope1type, setScope1type]=useState("")
    const [graph, setGraph]=useState("0")
    const [cangraph, setCangraph]=useState("0")


    useEffect(()=> {
        if(needFetch === "1"){fetchScope1()}
    }, [needFetch])


    const fetchScope1 = async() => {



        const endpoint = `http://willh1.pythonanywhere.com/api/firms/${selected.id}/scope1${scope1type}`

        try{
            const response = await fetch(endpoint,{
                method:'GET',
                headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
                }
            })


            const dataf = await response.json()
            setScope1(dataf)
            setNeedFetch("0")
            setScope1type("")

        }catch (e){
        console.log(e)
        }

        }


    return (


                <p>
                    <div className='p-5 bg-light w-fit'>
                        <div className='bg-white shadow border'>


                            <div class="flex justify-left">
                              <div class="mb-[0.125rem] me-0 inline-block min-h-[1.5rem] ps-[1.5rem]">



                                <input
                                  class="relative float-left -ms-[0.5rem] me-1 mt-0.5 h-4 w-4 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                                  type="radio"
                                  onChange={() => {setScope1type(""); setNeedFetch("1"); setCangraph("0")}}
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="option1"
                                  defaultChecked />
                                <label
                                  class="text-xs mt-px inline-block ps-[0.02rem] hover:cursor-pointer"
                                  for="inlineRadio1"
                                  >All data</label
                                >
                              </div>

                              <div class="mb-[0.125rem] me-4 inline-block min-h-[1.5rem] ps-[1.5rem]">
                                <input
                                  class="relative float-left -ms-[0.5rem] me-1 mt-0.5 h-4 w-4 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                                  type="radio"
                                  onChange={() => {setScope1type("_hq"); setNeedFetch("1"); setCangraph("1")}}
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="option2" />
                                <label
                                  class="text-xs mt-px inline-block ps-[0.02rem] hover:cursor-pointer"
                                  for="inlineRadio2"
                                  >HQ-based</label
                                >
                              </div>

                              <div class="mb-[0.125rem] me-4 inline-block min-h-[1.5rem] ps-[1.5rem]">
                                <input
                                  class="relative float-left -ms-[0.5rem] me-1 mt-0.5 h-4 w-4 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                                  type="radio"
                                  onChange={() => {setScope1type("_loc"); setNeedFetch("1"); setCangraph("0")}}
                                  name="inlineRadioOptions"
                                  id="inlineRadio3"
                                  value="option3" />
                                <label
                                  class="text-xs mt-px inline-block ps-[0.02rem] hover:cursor-pointer"
                                  for="inlineRadio3"
                                  >Location-based</label
                                >
                              </div>
                            </div>

                        </div>
                    </div>

                    <div class="flex justify-between">
                        <div class="flex float-left">

                            <div className='p-5 bg-light float-left justify-item-left'>
                                <div className='bg-white shadow border'>
                                    <p class="text-sm">
                                        {selected.name}
                                        <span> | </span>
                                        Scope 1


                                    </p>
                                    <table className='table'>
                                        <thead class="bg-gray-50 border-b-2 border-gray-200">
                                            <tr>
                                                <th class="p-3 text-sm tracking-wide text-left">Date</th>
                                                <th class="p-3 text-sm tracking-wide text-left">Source</th>
                                                <th class="p-3 text-sm tracking-wide text-left">Value</th>
                                                <th class="p-3 text-sm tracking-wide text-left">Unit</th>
                                                <th class="p-3 text-sm tracking-wide text-left">Metric</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scope1.map((d,i) => (
                                                <tr key={i}>
                                                    <td class="p-0 text-center text-sm text-gray-700">{d.date}</td>
                                                    <td class="p-0 text-center text-sm text-gray-700">{d.source}</td>
                                                    <td class="p-0 text-center text-sm text-gray-700">{d.value}</td>
                                                    <td class="p-0 text-center text-sm text-gray-700">{d.unit}</td>
                                                    <td class="p-0 text-center text-sm text-gray-700">{d.metric}</td>
                                                    {d.location === "" ? <td></td> : <td class="p-0 text-left text-sm text-gray-700"> {d.location} </td>}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                             </div>



                             {cangraph === "0" ? <></>
                                  :  <button class="h-6 bg-gray-300 hover:bg-gray-400 text-sm text-gray-800 py-1 px-1 rounded items-center" onClick={() => {setGraph("1") }}>Graph</button>}

                        </div>


                        <div className='p-5 bg-light float-center'>
                            <div className='bg-white shadow border'>
                                {graph === '1' && <Graph1 scope1={scope1} graph={graph} setGraph={setGraph} />}
                            </div>
                        </div>



                </div>
            </p>
             )
            }
    export default SelectedFirm;