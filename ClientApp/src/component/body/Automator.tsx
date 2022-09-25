import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {Card, CloseButton} from 'react-bootstrap'

import '../../css/automator.scss'
import { TestStep } from '../../interface/interface';

export default function Automator(){
    // test action with code
    const [testActions, setTestActions] = useState<Array<TestStep>>([]);
    // save test steps
    const [testStep, setTestStep] = useState<Array<string>>([]);
    
    const testStepRef = useRef(null);

    useEffect(()=>{
        // TODO: get actions from db
        axios.get(`/api/teststep`)
        .then(res=>{
            setTestActions(res.data)
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
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
                    options={testActions?testActions.map((option)=>option.action):[]}
                    sx={{ width: 700 }}
                    renderInput={(params) => <TextField {...params} label="Action" />}
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
                            <Card id="card" key={index}>
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