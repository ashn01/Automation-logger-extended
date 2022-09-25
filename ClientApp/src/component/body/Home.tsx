import axios from 'axios';
import {useState} from 'react';
import { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import {
    Autocomplete,
    TextField
} from '@mui/material'
import Testresult, {SearchTestresult} from './TestResult'

import '../../css/home.css'

import {TestCase, TestResultViewModel} from '../../interface/interface'

export default function Home() {
    const [testCases, setTestCases] = useState<Array<TestCase>>();
    const [searched, setSearched] = useState<TestCase>();
    const [tab, setTab] = useState<string>('international');
    const [isDataLoaded,setIsDataLoaded] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);

    useEffect(()=>{
        console.log(`get ${tab}`)
        setIsDataLoaded(false)
        // get data
        axios.get(`/api/testscript/${tab}`)
        .then((res=>{
            // console.log(res)
            setTestCases(res.data);
            setIsDataLoaded(true)
        }))
        .catch(err=>{
            console.log(err)
        })
    },[tab])

    const InitBtn = () =>{
        console.log("Init")
        axios.get('/api/testscript/init').then((res => {
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
            status:false,
            templateName:"international",
            testCaseName:"Automated Acceptance Test/Audit - Client Acceptance Part 1.t",
            version:"25.00.103"
        }
        axios.put('/api/testresult', tr).then((res => {
            console.log(res)
        }))
        .catch(err=>{
            console.log(err)
        })
    }

    const searchByTestcaseName = (value:string|null) =>{
        console.log(value)
        setIsDataLoaded(false)
        if(value != null){
            // do search
            setIsSearch(true);
            axios.get(`/api/testresult/${tab}/${value}`)
            .then((res=>{
                console.log(res)
                setSearched(res.data);
            }))
            .catch(err=>{
                console.log(err)
            })
        }else{
            // return to home
            setIsSearch(false);
        }
        setIsDataLoaded(true)
    }

    return (
        <div>
            <div id="auto-complete-container">
                <Autocomplete
                    disablePortal
                    id="auto-complete"
                    options={testCases?testCases.map((option)=>option.name):[]}
                    sx={{ width: 700 }}
                    renderInput={(params) => <TextField {...params} label="Test cases" />}
                    onChange={(event:any, newValue:string|null)=>{
                        searchByTestcaseName(newValue)
                    }}
                />
            </div>
            <div id="test-result-container">
                <Tabs activeKey={tab} id="uncontrolled-tab" onSelect={(k)=>setTab(k?k:"international")}>
                    <Tab eventKey="international" title="International">
                        {isSearch == false ? 
                        <Testresult testCases={testCases} dataLoaded={isDataLoaded}/> :
                        <SearchTestresult testCase={searched} dataLoaded={isDataLoaded}/>
                        }
                    </Tab>
                    <Tab eventKey="us" title="US">
                        <Testresult testCases={testCases} dataLoaded={isDataLoaded}/>
                    </Tab>
                    <Tab eventKey="system" title="System">
                        <Testresult testCases={testCases} dataLoaded={isDataLoaded}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}