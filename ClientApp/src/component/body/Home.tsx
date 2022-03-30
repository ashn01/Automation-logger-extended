import axios from 'axios';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import Testresult from './TestResult'

import '../../css/home.css'

import {TestCase, TestResult, TestResultViewModel} from '../../interface/interface'

export default function Home() {
    const [testCases, setTestCases] = useState<Array<TestCase>>();
    const [tab, setTab] = useState<string>('international');
    const [isDataLoaded,setIsDataLoaded] = useState<boolean>(false);

    useEffect(()=>{
        console.log(`get ${tab}`)
        setIsDataLoaded(false)
        axios.get(`/api/testcase/${tab}`)
        .then((res=>{
            console.log(res)
            setTestCases(res.data);
            setIsDataLoaded(true)
        }))
        .catch(err=>{
            console.log(err)
        })
    },[tab])

    const InitBtn = () =>{
        console.log("Init")
        axios.get('/api/testcase/init').then((res => {
            console.log(res)
        }))
        .catch(err=>{
            console.log(err)
        })
    }
    
    const testBtn = () =>{
        console.log("hey")
        let tr:TestResultViewModel = {
            created: new Date(),
            status:true,
            templateName:"international",
            testCaseName:"Automated Acceptance Test/Audit - Client Acceptance Part 2.t",
            version:"25.00.101"
        }
        axios.post('/api/testresult', tr).then((res => {
            console.log(res)
        }))
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <button onClick={InitBtn}>Init</button>
            <button onClick={testBtn}>Test</button>
            <Tabs activeKey={tab} id="uncontrolled-tab" className="mb-3" onSelect={(k)=>setTab(k?k:"international")}>
                <Tab eventKey="international" title="International">
                    <Testresult testCases={testCases} dataLoaded={isDataLoaded}/>
                </Tab>
                <Tab eventKey="us" title="US">
                    <Testresult testCases={testCases} dataLoaded={isDataLoaded}/>
                </Tab>
                <Tab eventKey="system" title="System">
                    <Testresult testCases={testCases} dataLoaded={isDataLoaded}/>
                </Tab>
            </Tabs>
        </div>
    );
}