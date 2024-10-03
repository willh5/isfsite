// @ts-nocheck
import React from 'react';
import { useState, useEffect, useContext } from 'react'
import AuthContext from './context/AuthContext'
import axios from 'axios'
import './App.css';



import styled from "styled-components";

import SelectedFirm from "./SelectedFirm";
import SelectedFirm4 from "./SelectedFirm4";
import SelectedFirm2 from "./SelectedFirm2";


function FirmEx2() {


    let { authTokens } = useContext(AuthContext)
    const [data, setData]=useState([])
    const [sectorID, setSectorID]=useState("")
    const [searchText, setSearchText]=useState("")
    const [searchText2, setSearchText2]=useState("")

    const [datatype, setDatatype]=useState("0")

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
    const [needFetch, setNeedFetch] = useState("0")

    const [nextpg, setNextpg] = useState(null)
    const [prevpg, setPrevpg] = useState(null)
    const [fcount, setFcount] = useState(null)
    const [curpg, setCurpg] = useState("1")

    const fetchData = async() => {
        console.log("success 2")

        const endpoint = `http://willh1.pythonanywhere.com/api/firms/?name__icontains=${searchText}&sector__id__iexact=${sectorID}&hq_location__name__icontains=${searchText2}&page=${curpg}`

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

            setNextpg(datas.next)
            setPrevpg(datas.previous)
            setFcount(datas.count)

        }catch (e){
        console.log(e)
        }

        }



    useEffect(()=> {
        console.log("success 1")
        fetchData()
    }, [deb, deb2, sectorID,curpg])





    return (
        <>
            <div className='p-5 bg-light'>
                <div className='bg-white shadow border'>

                    <table className='table'>
                        <thead class="bg-gray-50 border-b-2 border-gray-200">

                            <tr>
                                <th class="p-0 text-sm tracking-wide text-left"><input type="search" value={searchText} onChange={e=> {setSearchText(e.target.value); setCurpg("1")}} placeholder="Search firm name" /></th>
                                <th class="p-0 text-sm tracking-wide text-left">
                                    <select onChange={(e) => {setSectorID(e.target.value); setCurpg("1")}}>
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
                                </th>
                                <th class="p-0 text-sm tracking-wide text-left"><input type="search" value={searchText2} onChange={e=> {setSearchText2(e.target.value); setCurpg("1")}} placeholder="Filter by country name" /></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d,i) => (
                                <tr key={i}>
                                    <td class="p-1 text-sm text-gray-700">{d.name}</td>
                                    <td class="p-1 text-sm text-gray-700">{d.sector}</td>
                                    <td class="p-1 text-sm text-gray-700">{d.hq_location}</td>
                                    <td class="p-1 text-xs text-gray-700"><button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setSelected(d); setDatatype("1"); setNeedFetch("1")}}>Load</button></td>
                                    {d.hasScope1 ? <td class="p-1 text-xs text-gray-700"><button class="bg-green-600 hover:bg-green-800 text-zinc-50 py-0 px-2 rounded-full inline-flex items-center" onClick={() => {setSelected(d); setDatatype("1"); setNeedFetch("1")}}>1</button></td> : <td></td>}
                                    {d.hasScope2 ? <td class="p-1 text-xs text-gray-700"><button class="bg-green-600 hover:bg-green-800 text-zinc-50 py-0 px-2 rounded-full inline-flex items-center" onClick={() => {setSelected(d); setDatatype("2"); setNeedFetch("1")}}>2</button></td> : <td></td>}
                                    {d.hasScope3 ? <td class="p-1 text-xs text-gray-700"><button class="bg-green-600 hover:bg-green-800 text-zinc-50 py-0 px-2 rounded-full inline-flex items-center" onClick={() => {setSelected(d); setDatatype("3"); setNeedFetch("1")}}>3</button></td> : <td></td>}
                                    {d.hasTargets ? <td class="p-1 text-xs text-gray-700"><button class="bg-green-600 hover:bg-green-800 text-zinc-50 text-xs text-caps py-0 px-1 rounded-full inline-flex items-center" onClick={() => {setSelected(d); setDatatype("4"); setNeedFetch("1")}}>Targets</button></td> : <td></td>}

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

             </div>
             <div class="float-right px-6 text-xs">

                {fcount && fcount} matching companies
                <span> | </span>
                pg {curpg}
                <span> | </span>
                {prevpg && <button onClick={() => setCurpg(JSON.stringify(Number(curpg)-1))}>prev</button>}
                <span> | </span>
                {nextpg && <button onClick={() => setCurpg(JSON.stringify(Number(curpg)+1))}>next</button>}
             </div>

                 {selected &&
                     <div>
                        {datatype === "1" ? <button class="bg-gray-400  text-sm text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setDatatype("1"); setNeedFetch("1") }}>Scope 1</button>
                          :  <button class="bg-gray-300 hover:bg-gray-400 text-sm text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setDatatype("1"); setNeedFetch("1") }}>Scope 1</button>}
                        <span> | </span>
                        {datatype === "2" ? <button class="bg-gray-400  text-sm text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setDatatype("2"); setNeedFetch("1") }}>Scope 2</button>
                          :  <button class="bg-gray-300 hover:bg-gray-400 text-sm text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setDatatype("2"); setNeedFetch("1") }}>Scope 2</button>}
                        <span> | </span>
                        {datatype === "3" ? <button class="bg-gray-400  text-sm text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setDatatype("3"); setNeedFetch("1") }}>Scope 3</button>
                          :  <button class="bg-gray-300 hover:bg-gray-400 text-sm text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setDatatype("3"); setNeedFetch("1") }}>Scope 3</button>}
                        <span> | </span>
                        {datatype === "4" ? <button class="bg-gray-400  text-sm text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setDatatype("4"); setNeedFetch("1") }}>Targets</button>
                          :  <button class="bg-gray-300 hover:bg-gray-400 text-sm text-gray-800 py-1 px-1 rounded inline-flex items-center" onClick={() => {setDatatype("4"); setNeedFetch("1") }}>Targets</button>}

                    </div>
                    }


             <div>
             {datatype === '1' && <p><SelectedFirm selected={selected} needFetch={needFetch} setNeedFetch={setNeedFetch} /></p>}
             </div>
             <div>
             {datatype === '2' && <p><SelectedFirm2 selected={selected} needFetch={needFetch} setNeedFetch={setNeedFetch} /></p>}
             </div>

             <div>
             {datatype === '4' && <p><SelectedFirm4 selected={selected} needFetch={needFetch} setNeedFetch={setNeedFetch} /></p>}
             </div>

        </>
    );
}

export default FirmEx2;


