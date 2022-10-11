import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {Button, Card} from 'react-bootstrap'

import '../../css/automator.scss'
import { generateScript } from '../../functions/silktest';
import { TestStep } from '../../interface/interface';
import AlertDialog from './AlertDialog';
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
    },[testSteps.length])
    
    const addTestStep = (step:TestStep) =>{
        // TODO: adding test steps
        const newArray = [...testSteps];
        step.isStep = true; // step by default
        newArray.push(step);
        setTestSteps(newArray);
        // console.log(step)
        // for(let i=0;i<step.code.length;i++){
        //     console.log(step.code[i], step.code.charCodeAt(i))
        // }
    }

    const reorderTestStep = (index:number, newIndex:number) =>{
        // TODO: reordering test steps
        const newArray = [...testSteps];
        [newArray[index], newArray[newIndex]] = [newArray[newIndex], newArray[index]]
        setTestSteps(newArray);
    }

    const removeTestStep = (index:number) =>{
        // TODO: removing test steps
        const newArray = [...testSteps];
        newArray.splice(index,1);
        setTestSteps(newArray);
    }

    const updateTestStep = (index:number, testStep:TestStep) =>{
        // console.log(index, testStep.isStep)
        const newArray = [...testSteps];
        newArray[index]=testStep;
        setTestSteps(newArray);
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
            setTestActions(res.data)
            setDialogOpen(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // generate test case
    const generate = () =>{
        // console.log(testSteps)
        let script = generateScript(testID, testName, testSteps)
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
            <div id="add-test-action-btn-container">
                <Button onClick={()=>setDialogOpen(true)}>Add new action</Button>
            </div>
            <div id="test-case-name-container">
                <TextField label="Testcase ID" variant="outlined" onChange={e=>setTestID(e.target.value)}/>
                <TextField label="Testcase Name" variant="outlined" onChange={e=>setTestName(e.target.value)}/>
            </div>
            <Card id="card-container" ref={testStepRef}>
                {
                    testSteps.map((value, index)=>{
                        let i=0;
                        let step = testSteps.filter(ts=> i++<=index && ts.isStep).length;
                        return (
                            <TestStepCard 
                                testStep={value} 
                                index={index} 
                                step={step}
                                key={index} 
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