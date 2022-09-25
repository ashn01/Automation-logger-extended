import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react'
import {Card, CloseButton} from 'react-bootstrap'

import '../../css/automator.scss'

export default function Automator(){
    // save test steps
    const [testStep, setTestStep] = useState<Array<string>>([]);
    const testStepRef = useRef(null);

    useEffect(()=>{
        // TODO: ?
    },[testStep.length])
    
    const addTestStep = (step:string) =>{
        // TODO: adding test steps
        const newArray = [...testStep];
        newArray.push(step);
        setTestStep(newArray);
    }

    const reorderTestStep = () =>{
        // TODO: reordering test steps
    }

    const removeTestStep = (index:number) =>{
        // TODO: removing test steps
        console.log(index)
        const newArray = [...testStep];
        newArray.splice(index,1);
        console.log(newArray)
        setTestStep(newArray);
    }

    return (
        <div id="automator-container">
            <div id="auto-complete-container">
                <Autocomplete
                    disablePortal
                    id="auto-complete"
                    options={["step 1", "step 2", "step 3", "step 4", "step 5"]}
                    sx={{ width: 700 }}
                    renderInput={(params) => <TextField {...params} label="Test cases" />}
                    onChange={(event:any, newValue:string|null)=>{
                        if(newValue){
                            addTestStep(newValue)
                        }
                    }}
                />
            </div>
            <Card id="card-container" ref={testStepRef}>
                {
                    testStep.map((value, index)=>{
                        return (
                            <Card id="card">
                                <Card.Header>
                                    Step {index+1} 
                                    <CloseButton id="close-button" onClick={()=>{removeTestStep(index)}}/>
                                </Card.Header>
                                <Card.Body>{value}</Card.Body>
                            </Card>
                        )
                        
                    })
                }
            </Card>
        </div>
    )
}