import {
    Paper, 
    styled, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    CircularProgress} from '@mui/material'
import moment from 'moment'

// interface
import {TestCase, TestResult} from '../../interface/interface'

// scss
import '../../css/testResult.scss'
import ChartComponent from './ChartComponent';
import { useEffect, useState } from 'react';

export default function Testresult(props:
    {
        testCases:Array<TestCase>|undefined,
        dataLoaded:boolean,
        onClickResult:(value:string|null)=>void
    })
    {

    return(
        <div>
            <div className={`chart-container`}>
                <ChartComponent testResults={props.testCases ? props.testCases.slice(0, 15):[]}/>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650}} aria-label="test result">
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2} align="center">#</TableCell>
                            <TableCell rowSpan={2} align="center">Test Name</TableCell>
                            <TableCell colSpan={2} align="center">Current</TableCell>
                            <TableCell rowSpan={2} align="center">Recent Pass</TableCell>
                            <TableCell rowSpan={2} align="center">Recent Fail</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Version</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.testCases && props.testCases.map((test,key)=>{
                                if(test.name === "--divider--"){
                                    return (
                                    <TableRow key={key}>
                                        <TableCell colSpan={6}></TableCell>
                                    </TableRow>
                                    )
                                }
                                return(
                                    <TableRow key={key} onClick={()=>props.onClickResult(test.name)}>
                                        <TableCell>{key + 1}</TableCell>
                                        <TableCell>{test.name}</TableCell>
                                        <TableCell className={`${test.testResults.length > 0 && props.dataLoaded ? (test.testResults[0].status === true ? "pass" : "fail") : "na"}`}>{test.testResults.length > 0 && props.dataLoaded ? (test.testResults[0].status === true ? "PASS" : "FAIL") : "N/A"}</TableCell>
                                        <TableCell>{test.testResults.length > 0 && props.dataLoaded ? test.testResults[0].version : "N/A"}</TableCell>
                                        <TableCell>
                                            <div>{test.recentPass != null && props.dataLoaded ? test.recentPass.version : "N/A"}</div>
                                            <div className={`test-date`}>{test.recentPass != null && props.dataLoaded ? moment(test.recentPass.created).format("MMM-DD-YYYY") : ""}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div>{test.recentFail != null && props.dataLoaded ? test.recentFail.version : "N/A"}</div>
                                            <div className={`test-date`}>{test.recentFail != null && props.dataLoaded ? moment(test.recentFail.created).format("MMM-DD-YYYY") : ""}</div>
                                            <div> {test.failedContinued > 0 ? `failed ${test.failedContinued} times` : ""}</div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                !props.dataLoaded && 
                <CircularProgress color="secondary" disableShrink
                style={{
                    position:'absolute', 
                    transform:'translate(-50%,-50%)!important',
                    top:'50%',
                    left:'50%'
                    }}/>
            }
            
        </div>
    )
}

export function SearchTestresult(props:
    {
        testCase:TestCase|undefined,
        dataLoaded:boolean
    })
    {

    return(
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650}} aria-label="test result">
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2} align="center">#</TableCell>
                            <TableCell rowSpan={2} align="center">Test Name</TableCell>
                            <TableCell colSpan={2} align="center">Current</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Version</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.testCase && props.testCase.testResults.map((test,key)=>{
                                return(
                                    <TableRow key={key}>
                                        <TableCell>{key + 1}</TableCell>
                                        <TableCell>{props.testCase!.name}</TableCell>
                                        <TableCell className={`${props.dataLoaded ? (test.status === true ? "pass" : "fail") : "na"}`}>{props.dataLoaded ? (test.status === true ? "PASS" : "FAIL") : "N/A"}</TableCell>
                                        <TableCell>{props.dataLoaded ? test.version : "N/A"}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                !props.dataLoaded && 
                <CircularProgress color="secondary" disableShrink
                style={{
                    position:'absolute', 
                    transform:'translate(-50%,-50%)!important',
                    top:'50%',
                    left:'50%'
                    }}/>
            }
            
        </div>
    )
}