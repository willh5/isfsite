// @ts-nocheck
import React from 'react';
import { useState, useEffect, useContext } from 'react'
import AuthContext from './context/AuthContext'
import axios from 'axios'

import { Line } from 'react-chartjs-2'
import { Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
    } from 'chart.js';

ChartJS.register(CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend)

function Graph1( { scope1, graph, setGraph } ) {
    const [graphdata, setGraphdata] = useState([])
    const [labels, setLabels] = useState([])
    const options = {};
    console.log('a0')

    useEffect(()=> {
        if(graph === "1"){
        setGraphdata({
        labels: scope1.map(d => JSON.stringify(d.date).slice(1,5)),
        datasets: [{
        label: "Scope 1",
        data: scope1.map(d => d.value),
        borderColor: "rgb(75,192,192)",
        }]
        })
        console.log('a1')
        }
        console.log('a2')
    }, [graph])




    return (
    <>
    <div style={{width: 600, height: 300}}>
    {graphdata.labels}
    {console.log('asd')}

    </div>

    </>

    );
}

export default Graph1;


