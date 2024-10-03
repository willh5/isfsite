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

import SelectedFirm from "./SelectedFirm";



function FirmEx() {


    let { authTokens } = useContext(AuthContext)
    const [data, setData]=useState([])
    const [sectorID, setSectorID]=useState("")
    const [searchText, setSearchText]=useState("")
    const [searchText2, setSearchText2]=useState("")

    const [selected, setSelected]=useState(null)
    const theme = {
          blue: {
            default: "#3f51b5",
            hover: "#283593",
          },
          pink: {
            default: "#e91e63",
            hover: "#ad1457",
          },
        };


    const Button = styled.button`
          background-color: ${(props) => theme[props.theme].default};
          color: white;
          padding: 5px 15px;
          border-radius: 5px;
          outline: 0;
          border: 0;
          text-transform: uppercase;
          margin: 10px 0px;
          cursor: pointer;
          box-shadow: 0px 2px 2px lightgray;
          transition: ease background-color 250ms;
          &:hover {
            background-color: ${(props) => theme[props.theme].hover};
          }
          &:disabled {
            cursor: default;
            opacity: 0.7;
          }
        `;




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


    const deb = useDebounce(searchText, 300)
    const deb2 = useDebounce(searchText2, 300)



    const fetchData = async() => {
        console.log("success 2")

        const endpoint = `http://willh1.pythonanywhere.com/api/firms/?name__icontains=${searchText}&sector__id__iexact=${sectorID}&hq_location__name__icontains=${searchText2}`

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



    useEffect(()=> {
        console.log("success 1")
        fetchData()
    }, [deb, deb2, sectorID])





    return (
        <>
            <div className='p-5 bg-light'>
                <div className='bg-white shadow border'>

                    <input type="search" value={searchText} onChange={e=> setSearchText(e.target.value)} placeholder="Search by name" />
                    <select onChange={(e) => {setSectorID(e.target.value)}}>
                       <option value=''>Sector:</option>
                       <option value='1'>Financials</option>
                       <option value='2'>Utilities</option>
                       <option value='3'>Industrials</option>
                       <option value='4'>Materials</option>
                       <option value='5'>Real Estate</option>
                       <option value='6'>Communication Services</option>
                       <option value='7'>Health Care</option>
                       <option value='8'>Energy</option>
                       <option value='9'>Consumer Staples</option>
                       <option value='10'>Information Technology</option>
                       <option value='11'>Consumer Discretionary</option>
                       <option value='12'>nan</option>
                       <option value='13'>None Assigned</option>

                    </select>
                    <input type="search" value={searchText2} onChange={e=> setSearchText2(e.target.value)} placeholder="Location" />
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
                                    <td><button onClick={() => setSelected(d)}>Load Data</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

             </div>
             <div>
             {selected && <p><SelectedFirm selected={selected} /></p>}
             </div>

        </>
    );
}

export default FirmEx;


