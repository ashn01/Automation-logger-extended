import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {Button, Card, CloseButton} from 'react-bootstrap'

import '../../css/automator.scss'
import { MakeCamel } from '../../functions/general';
import { generateTestSteps } from '../../functions/silktest';
import { TestStep } from '../../interface/interface';
import AlertDialog from './AlertDialog';

export default function Automator(){
    // test case name
    const [testName, setTestName] = useState<string>('');
    // test case ID
    const [testID, setTestID] = useState<string>('');
    // test action with code
    const [testActions, setTestActions] = useState<Array<TestStep>>([]);
    // save test steps
    const [testStep, setTestStep] = useState<Array<TestStep>>([]);
    // generated script
    const [testScript, setTestScript] = useState<string>('');
    // add action dialog
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    // new action 
    const [newAction, setNewAction] = useState<string>('');
    // new action script
    const [newActionScript, setNewActionScript] = useState<string>('');

    const testStepRef = useRef(null);

    useEffect(()=>{
        // TODO: get actions from db
        axios.get(`/api/teststep`)
        .then(res=>{
            setTestActions(res.data)
            // console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[testStep.length])
    
    const addTestStep = (step:TestStep) =>{
        // TODO: adding test steps
        const newArray = [...testStep];
        newArray.push(step);
        setTestStep(newArray);
        // console.log(step)
        // for(let i=0;i<step.code.length;i++){
        //     console.log(step.code[i], step.code.charCodeAt(i))
        // }
    }

    const reorderTestStep = () =>{
        // TODO: reordering test steps
    }

    const removeTestStep = (index:number) =>{
        // TODO: removing test steps
        const newArray = [...testStep];
        newArray.splice(index,1);
        setTestStep(newArray);
    }

    const addTestAction = () =>{
        console.log(newAction)
        console.log(newActionScript)
        const newTestAction:TestStep = {
            action: newAction,
            code: newActionScript
        }
        axios.post(`/api/teststep`,newTestAction)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // generate test case
    const generate = () =>{
        let script = `// ${testID}
testcase ${MakeCamel(testName)}() appstate VarsLoadedState
\tSTRING sTestcaseId = "${testID}"
\tLOGGER.testresult("${testName}", R_SUBTITLE, sTestcaseId)
\t
\tdo
\t\tTaskbar.SetActive ()
\t\tCaseWare.SetActive ()
\texcept
\t\tLOGGER.testresult("Testcase {GetTestCaseName ()} could not start. {ExceptData ()}", R_EXCEPT)
\t\treraise
\t
\tdo`

        let indentLevel = 2;

        // Add each test cases here
        script += generateTestSteps(testStep);

        script += `
\texcept
\t\tLOGGER.testresult("Could not complete. {ExceptData()}", R_EXCEPT, sTestcaseId)`
        // output
        console.log(script)
        setTestScript(script);
    }

    return (
        <div id="automator-container">
            <div id="auto-complete-container">
                <Autocomplete
                    disablePortal
                    id="auto-complete"
                    options={testActions?testActions.map((option)=>option):[]}
                    getOptionLabel={options=>options.action}
                    sx={{ width: 700 }}
                    renderInput={(params) => <TextField {...params} label="Action" />}
                    onChange={(event:any, newValue:any)=>{
                        // console.log(newValue)
                        if(newValue){
                            addTestStep(newValue)
                        }
                    }}
                />
            </div>
            <div id="add-test-action-btn-container">
                <Button onClick={()=>setDialogOpen(true)}>Add new action</Button>
            </div>
            <div id="test-case-name-container">
                <TextField label="Testcase ID" variant="outlined" onChange={e=>setTestID(e.target.value)}/>
                <TextField label="Testcase Name" variant="outlined" onChange={e=>setTestName(e.target.value)}/>
            </div>
            <Card id="card-container" ref={testStepRef}>
                {
                    testStep.map((value, index)=>{
                        return (
                            <Card id="card" key={index}>
                                <Card.Header>
                                    Step {index+1} 
                                    <CloseButton id="close-button" onClick={()=>{removeTestStep(index)}}/>
                                </Card.Header>
                                <Card.Body className={`card-body`}>
                                    <div>
                                        {value.action}
                                    </div>
                                    <div>
                                        {
                                            value.code.split('\n').map(text=>{
                                                return <p>{text}</p>
                                            })
                                        }
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                        
                    })
                }
            </Card>
            <div id="generate-btn-container">
                <Button id="generate-btn" onClick={generate}>Generate</Button>
            </div>
            <div id="generated-script-container">
                <TextField
                    id="generated-script"
                    label="Generated Script"
                    multiline
                    value={testScript}
                />
            </div>
            <AlertDialog 
                open={dialogOpen} 
                setOpen={setDialogOpen} 
                title={`New test action`}
                contents={
                    <div id="alert-contents">
                        <TextField 
                            style={{width:'500px'}}
                            label="Action" 
                            variant="outlined" 
                            onChange={e=>setNewAction(e.target.value)}
                        />
                        <TextField
                            label="Script"
                            multiline
                            minRows={4}
                            maxRows={10}
                            onChange={e=>setNewActionScript(e.target.value)}
                        />
                    </div>
                }
                button={
                    <Button 
                        onClick={addTestAction}
                    >Submit</Button>
                }
            />
        </div>
    )
}