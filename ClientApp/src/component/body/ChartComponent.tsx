import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    defaults,
    CategoryScale,
    LinearScale,
    BarElement
  } from 'chart.js';
  import {
    Chart
  } from 'react-chartjs-2';

import { TestCase, TestResult } from '../../interface/interface';

const options = {
    plugins: {
      title: {
        display: true,
        text: 'Recent Acceptance tests rate - 10 days',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
            stepSize:1,
        }
      },
    }
  };

interface dataset{
    label:string,
    data: Array<number>,
    backgroundColor: Array<string>,
    borderWidth:number
}

interface data{
    labels:Array<string>,
    datasets: Array<dataset>
}

export default function ChartComponent(props:{
    testResults:Array<TestCase>
}){
    useEffect(()=>{
        ChartJS.register(CategoryScale, LinearScale, BarElement)
        let arrLabels:Array<string> = []
        let passes:Array<number> = []
        let fails:Array<number> = []
        props.testResults.forEach((value, index)=>{
            // get name
            arrLabels.push(value.name.substring(value.name.indexOf('-')+2, value.name.indexOf('.')));

            // get results
            let pass = 0
            let fail = 0
            value.testResults.forEach((result, i) => {
                if (result.status){
                    pass++
                }else{
                    fail++
                }
            });
            passes.push(pass)
            fails.push(fail)
        })

        let passSet = {
            label: 'Pass',
            data:passes,
            backgroundColor: [
              'rgb(100,255,100)'
            ],
            borderWidth: 1
        }
        let failSet = {
            label: 'Fail',
            data:fails,
            backgroundColor: [
              'rgb(255,100,100)'
            ],
            borderWidth: 1
        }
        // console.log(arrLabels)
        setData(prev=>({...prev, labels:arrLabels, datasets:[passSet, failSet]}))

    },[props.testResults])


    const [data, setData] = useState<data>();
      
      useEffect(()=>{
        
      },[])



    return (
        <div>
            {
                data!=undefined &&
                <Bar data={data} options={options} />
            }
        </div>
    )
}