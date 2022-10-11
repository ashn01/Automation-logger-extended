import { useEffect } from "react";
import { IconButton, Switch } from "@mui/material";
import { Card, CloseButton } from "react-bootstrap";
import { TestStep } from "../../interface/interface";
import ArrowUp from '@mui/icons-material/KeyboardArrowUp';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';

import '../../css/automator.scss'
export default function TestStepCard(props:{
    testStep:TestStep,  // testStep contains action, code, and step 
    index:number, // current index of this test step
    step:number, // current step of this test step (some test step doesn't have step ex, pre requisite or multiple actions in one step)
    length:number, // full length of the test steps require to disable move up or down arrow
    removeTestStep:(index:number)=>void, // to remove current test step, call parents funciton
    updateTestStep:(index:number, testStep:TestStep)=>void, // to update current test step, call parents funciton
    reorderTestStep:(index:number, newIndex:number)=>void // to reorder current test step, call parents funciton
}){
    // const [testStep, setTestStep] = useState<TestStep>(props.testStep);

    useEffect(()=>{
        // console.log("trigger")
    },[props.testStep])

    const onChangeStep = (isStep:boolean|undefined) =>{
        if(isStep !== undefined){
            const newTestStep = props.testStep;
            newTestStep.isStep = !newTestStep.isStep; 
            // setTestStep(newTestStep);
            props.updateTestStep(props.index, newTestStep)
        }
    }

    return(
        <Card id="card" key={props.index}>
            <Card.Header>
                <div>
                    {props.testStep.isStep?`Step ${props.step}`:""}
                    <Switch checked={props.testStep.isStep} 
                    onChange={()=>onChangeStep(props.testStep.isStep)} />
                </div>
                <div>
                    <IconButton onClick={()=>props.reorderTestStep(props.index,props.index-1)} disabled={props.index === 0}>
                        <ArrowUp fontSize="inherit"/>
                    </IconButton>
                    <IconButton onClick={()=>props.reorderTestStep(props.index,props.index+1)} disabled={props.index+1 === props.length}>
                        <ArrowDown fontSize="inherit"/>
                    </IconButton>
                    <CloseButton id="close-button" onClick={() => { props.removeTestStep(props.index) }} />
                </div>
            </Card.Header>
            <Card.Body className={`card-body`}>
                <div>
                    {props.testStep.action}
                </div>
                <div>
                    {
                        props.testStep.code.split('\n').map(text => {
                            return <p>{text}</p>
                        })
                    }
                </div>
            </Card.Body>
        </Card>
    )
}