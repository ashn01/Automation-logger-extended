import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {Button, Card} from 'react-bootstrap'

import '../../css/automator.scss'
import { generateScript } from '../../functions/silktest';
import { TestStep } from '../../interface/interface';
import ModifyActionDialog from './ModifyActionDialog';
import NewActionDialog from './NewActionDialog';
import TestStepCard from './TestStepCard';

export default function Automator(){
    // test case name, will be converted to Camel case
    const [testName, setTestName] = useState<string>('');
    // test case ID, start with C####
    const [testID, setTestID] = useState<string>('');
    // test action with code, testActions that user can choose from auto complete field
    const [testActions, setTestActions] = useState<Array<TestStep>>([]);
    // save test steps, test steps that user select all test steps
    const [testSteps, setTestSteps] = useState<Array<TestStep>>([]);
    // generated script that actual silk test script
    const [testScript, setTestScript] = useState<string>('');
    // add action dialog. this is a trigger to open the dialog
    const [newDialogOpen, setNewDialogOpen] = useState<boolean>(false);
    // modify action dialog.
    const [modifyDialogOpen, setModifyDialogOpen] = useState<boolean>(false);

    // when: once loaded
    useEffect(()=>{
        // TODO: get actions from db
        axios.get(`/api/teststep`)
        .then(res=>{
            updateTestActions(res.data)
            // console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    // to update test actions in auto complete field
    // should be called whenever gets test actions from the server
    const updateTestActions = (testActions:Array<TestStep>) =>{
        setTestActions(testActions)
    }
    
    // should be called when user select a test action in the auto complete field
    const addTestStep = (step:TestStep) =>{
        // TODO: adding test steps
        const newArray = [...testSteps];
        let newStep = JSON.parse(JSON.stringify(step));

        newStep.isStep = true; // step by default
        newStep.alteredCode = newStep.code;

        newArray.push(newStep);
        setTestSteps(newArray);
    }

    // should be called when user changes test steps' order
    const reorderTestStep = (index:number, newIndex:number) =>{
        // TODO: reordering test steps
        const newArray = [...testSteps];
        [newArray[index], newArray[newIndex]] = [newArray[newIndex], newArray[index]]
        setTestSteps(newArray);
    }

    // should be called when user delete a test step
    const removeTestStep = (index:number) =>{
        // TODO: removing test steps
        const newArray = [...testSteps];
        newArray.splice(index,1);
        setTestSteps(newArray);
    }

    // should be called when a test step need to be updated
    const updateTestStep = (index:number, testStep:TestStep) =>{
        console.log(index)
        // console.log(index, testStep.isStep)
        const newArray = [...testSteps];
        newArray[index]=testStep;
        console.log(newArray)
        setTestSteps(newArray);
    }

    // generate test case
    const generate = () =>{
        // console.log(testSteps)
        let script = generateScript(testID, testName, testSteps)
        // output
        console.log(script)
        setTestScript(script);
    }

    // clear all test steps
    const clear = () =>{
        setTestSteps([])
        setTestScript('');
    }

    return (
        <div id="automator-container">
            <div id="auto-complete-container">
                <Autocomplete
                    disablePortal
                    id="auto-complete"
                    options={testActions?testActions.map((option)=>option):[]}
                    isOptionEqualToValue={(option,value)=>option.action == value.action}
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
            <div id="test-action-btn-container">
                <Button onClick={()=>setNewDialogOpen(true)}>Add new action</Button>
                <Button onClick={()=>setModifyDialogOpen(true)}>Modify action</Button>
            </div>
            <div id="test-case-name-container">
                <TextField label="Testcase ID" variant="outlined" onChange={e=>setTestID(e.target.value)}/>
                <TextField label="Testcase Name" variant="outlined" onChange={e=>setTestName(e.target.value)}/>
            </div>
            <Card id="card-container" >
                {
                    testSteps.map((value, index)=>{
                        let i=0;
                        let step = testSteps.filter(ts=> i++<=index && ts.isStep).length;
                        return (
                            <TestStepCard 
                                testStep={value} 
                                index={index} 
                                step={step}
                                key={`step-card-${index}`} 
                                length={testSteps.length}
                                removeTestStep={removeTestStep}
                                updateTestStep={updateTestStep}
                                reorderTestStep={reorderTestStep}
                            />
                        )
                        
                    })
                }
            </Card>
            <div id="generate-btn-container">
                <Button id="generate-btn" onClick={generate}>Generate</Button>
                <Button id="clear-btn" onClick={clear}>Clear</Button>
                <Button id="clear-btn" 
                    onClick={()=>navigator.clipboard.writeText(testScript)}
                >Copy to clipboard</Button>
            </div>
            <div id="generated-script-container">
                <TextField
                    id="generated-script"
                    label="Generated Script"
                    multiline
                    value={testScript}
                />
            </div>
            <NewActionDialog 
                open={newDialogOpen} 
                setOpen={setNewDialogOpen} 
                updateTestAction={updateTestActions}
            />
            <ModifyActionDialog 
                open={modifyDialogOpen} 
                setOpen={setModifyDialogOpen} 
                testActions={testActions}
            />
        </div>
    )
}