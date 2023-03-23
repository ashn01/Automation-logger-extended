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
import {TestCase} from '../../interface/interface'

// scss
import '../../css/testResult.scss'

const StyledTableCellHeader = styled(TableCell)(({theme})=>({
    '&.MuiTableCell-head':{
        border:'1px solid rgba(224, 224, 224, 1)'
    }
}));

const StyledTableRow = styled(TableRow)(({theme})=>({
    
    '&:hover':{
        backgroundColor: '#E0E0E0!important',
    },
    '&:nth-of-type(odd)':{
        backgroundColor: '#F1F1F1',
    }
}));

export default function Testresult(props:
    {
        testCases:Array<TestCase>|undefined,
        dataLoaded:boolean,
        onClickResult:(value:string|null)=>void
    })
    {

    return(
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650}} aria-label="test result">
                    <TableHead>
                        <TableRow>
                            <StyledTableCellHeader rowSpan={2} align="center">#</StyledTableCellHeader>
                            <StyledTableCellHeader rowSpan={2} align="center">Test Name</StyledTableCellHeader>
                            <StyledTableCellHeader colSpan={2} align="center">Current</StyledTableCellHeader>
                            <StyledTableCellHeader rowSpan={2} align="center">Recent Pass</StyledTableCellHeader>
                            <StyledTableCellHeader rowSpan={2} align="center">Recent Fail</StyledTableCellHeader>
                        </TableRow>
                        <TableRow>
                            <StyledTableCellHeader align="center">Status</StyledTableCellHeader>
                            <StyledTableCellHeader align="center">Version</StyledTableCellHeader>
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
                                    <StyledTableRow key={key} onClick={()=>props.onClickResult(test.name)}>
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
                                        </TableCell>
                                    </StyledTableRow>
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
                            <StyledTableCellHeader rowSpan={2} align="center">#</StyledTableCellHeader>
                            <StyledTableCellHeader rowSpan={2} align="center">Test Name</StyledTableCellHeader>
                            <StyledTableCellHeader colSpan={2} align="center">Current</StyledTableCellHeader>
                        </TableRow>
                        <TableRow>
                            <StyledTableCellHeader align="center">Status</StyledTableCellHeader>
                            <StyledTableCellHeader align="center">Version</StyledTableCellHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.testCase && props.testCase.testResults.map((test,key)=>{
                                return(
                                    <StyledTableRow key={key}>
                                        <TableCell>{key + 1}</TableCell>
                                        <TableCell>{props.testCase!.name}</TableCell>
                                        <TableCell className={`${props.dataLoaded ? (test.status === true ? "pass" : "fail") : "na"}`}>{props.dataLoaded ? (test.status === true ? "PASS" : "FAIL") : "N/A"}</TableCell>
                                        <TableCell>{props.dataLoaded ? test.version : "N/A"}</TableCell>
                                    </StyledTableRow>
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