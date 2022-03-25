import axios from 'axios';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';

import '../../css/home.css'

export default function Home() {
    const [testCases, setTestCases] = useState<Array<any>>();
    const [tab, setTab] = useState<string>('international');

    useEffect(()=>{
        console.log(`get ${tab}`)
        axios.get(`/api/testcase/${tab}`)
        .then((res=>{
            console.log(res)
            setTestCases(res.data);
        }))
        .catch(err=>{
            console.log(err)
        })
    },[tab])

    return (
        <div>
            <Tabs activeKey={tab} id="uncontrolled-tab" className="mb-3" onSelect={(k)=>setTab(k?k:"international")}>
                <Tab eventKey="international" title="International">
                    <TestsTable testCases={testCases}/>
                </Tab>
                <Tab eventKey="us" title="US">
                    <TestsTable testCases={testCases}/>
                </Tab>
                <Tab eventKey="system" title="System">
                    <TestsTable testCases={testCases}/>
                </Tab>
            </Tabs>
        </div>
    );
}

interface TestTableProps {
    testCases:Array<any>|undefined
}

function TestsTable(props:TestTableProps){
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th rowSpan={2}>
                        Number
                    </th>
                    <th rowSpan={2}>
                        Test name
                    </th>
                    <th colSpan={2}>
                        Current
                    </th>
                    <th rowSpan={2}>
                        Recent pass
                    </th>
                    <th rowSpan={2}>
                        Recent fail
                    </th>
                </tr>
                <tr>
                    <th>Status</th>
                    <th>Version</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.testCases && props.testCases.map((test,key)=>{
                        return(
                            <tr key={key}>
                                <td>{test.id}</td>
                                <td>{test.name}</td>
                                <td className={`${test.testResults.length>0?(test.testResults[0].status===true?"pass":"fail"):"na"}`}>{test.testResults.length>0?(test.testResults[0].status===true?"PASS":"FAIL"):"N/A"}</td>
                                <td>{test.testResults.length>0?test.testResults[0].version:"N/A"}</td>
                                <td>{test.recentPass!==null?test.recentPass.version:"N/A"}</td>
                                <td>{test.recentFail!==null?test.recentFail.version:"N/A"}</td>
                            </tr>
                        )
                    })
                    
                }
            </tbody>
        </Table>
    );
}