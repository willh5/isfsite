// @ts-nocheck
import React from 'react';
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'


import { useQuery } from '@tanstack/react-query';







function FirmTargets() {


    let { authTokens } = useContext(AuthContext)
    const [data, setData]=useState([])
    const [sectorData, setSectorData]=useState(null)

    const [sectorNames, setSectorNames]=useState([])
    const [searchText, setSearchText]=useState("")
    useEffect(()=> {
        console.log("success 0.0")
        fetchSectorData()
    }, [])

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


    const deb = useDebounce(searchText, 500)



    const fetchData = async() => {
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





  useEffect(()=> {
        console.log("success 1")
        fetchData()
    }, [deb])

    return (
    <div className='p-5 bg-light'>
        <div className='bg-white shadow border'>
            <input type="search" value={searchText} onChange={e=> setSearchText(e.target.value)} placeholder="Search" />

            <select onChange={(e) => {console.log(e.target.value)}}>
                {sectorData ? sectorData.map((sd) => {
                return(
                    <option key={sd.id} value={sd.id}>
                        {sd.name}
                    </option>
                );
                }) : null}
            </select>


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
                            <td><button onClick={goToFirm}>{d.name}</button></td>
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

export default FirmTargets;


