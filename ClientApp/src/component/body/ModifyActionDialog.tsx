import { Autocomplete, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, CloseButton } from 'react-bootstrap';


import '../../css/Dialog.scss'
import { TestActionValue, TestStep } from '../../interface/interface';

export default function ModifyActionDialog (
    props:{
        open:boolean,
        testActions:Array<TestStep>,
        setOpen:(open:boolean)=>void
    }
){

    // when: dialog open or close
    useEffect(()=>{
        console.log("open")
        setAction("")
        setActionScript("")
        setTestActionValues([]);

        return () =>{
            setAction("")
            setActionScript("")
            setTestActionValues([])
        }
    }, [props.open])

    // Selected test step
    const [selectedTestStep, setSelectedTestStep] = useState<TestStep>();
    // action
    const [action, setAction] = useState<string>('');
    // action script
    const [actionScript, setActionScript] = useState<string>('');
    // testActionValue
    const [testActionValues, setTestActionValues] = useState<Array<TestActionValue>>([])

    // add new param field in dialog
    const addParam = () =>{
        const newArray = [...testActionValues];
        let newActionValue:TestActionValue = {name:"", defaultValue:"", order:newArray.length}
        newArray.push(newActionValue)

        setTestActionValues(newArray)
    }

    // submit test action to the server
    const modifyTestAction = () =>{
        if(selectedTestStep != undefined){
            const modifiedTestAction:TestStep = {
                id:selectedTestStep.id,
                action: action,
                code: actionScript,
                testActionValues: testActionValues
            }
            console.log(modifiedTestAction)
            axios.put(`/api/teststep`,modifiedTestAction)
            .then(res=>{
                console.log(res.data)
                props.setOpen(false)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            console.log("no test step selected")
        }
    }

    const onSelectAction = (testStep:TestStep) =>{
        if(testStep){
            console.log(testStep)
            setSelectedTestStep(testStep)
            setAction(testStep.action)
            setActionScript(testStep.code)
            setTestActionValues(testStep.testActionValues || [])
        }
    }

    // when: test action name changes
    const onChangeActionName = (name:string, index:number) =>{
        const newArray = [...testActionValues];
        newArray[index].name = name;
        setTestActionValues(newArray)
    }

    // when: test action value changes
    const onChangeActionValue = (value:string, index:number) =>{
        const newArray = [...testActionValues];
        newArray[index].defaultValue = value;
        setTestActionValues(newArray)
    }

    const removeActionParam = (index:number) =>{
        const newArray = [...testActionValues];
        newArray.splice(index,1);
        setTestActionValues(newArray);
    }
    return (
        <Dialog
            open={props.open}
            onClose={()=>props.setOpen(false)}
        >
            <DialogTitle>
                Modify test action
            </DialogTitle>
            <DialogContent>
                    <div id="alert-contents">
                        <Autocomplete
                            disablePortal
                            id="auto-complete"
                            options={props.testActions?props.testActions.map((option)=>option):[]}
                            isOptionEqualToValue={(option,value)=>option.action == value.action}
                            getOptionLabel={options=>options.action}
                            renderInput={(params) => <TextField {...params} label="Select test step" />}
                            onChange={(event:any, newValue:any)=>{
                                // console.log(newValue)
                                if(newValue){
                                    onSelectAction(newValue)
                                }
                            }}
                        />
                        <TextField 
                            style={{width:'500px'}}
                            InputLabelProps={{ shrink: true }}
                            label="Action" 
                            variant="outlined" 
                            value={action}
                            onChange={e=>setAction(e.target.value)}
                        />
                        <TextField
                            label="Script"
                            InputLabelProps={{ shrink: true }}
                            multiline
                            minRows={4}
                            maxRows={10}
                            value={actionScript}
                            onChange={e=>setActionScript(e.target.value)}
                        />
                        {
                            testActionValues.map((action, key)=>{
                                return (
                                    <div id={`mod-action-params-${key}`}>
                                        <TextField
                                                key={`mod-name-${key}`}
                                                label={`Name`}
                                                value={action.name}
                                                onChange={e=>onChangeActionName(e.target.value,key)}
                                            />
                                        <TextField
                                                key={`mod-value-${key}`}
                                                label={`Default value`}
                                                value={action.defaultValue}
                                                onChange={e=>onChangeActionValue(e.target.value,key)}
                                            />
                                        <CloseButton 
                                            id="close-button" 
                                            onClick={() => removeActionParam(key)} 
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
            </DialogContent>
            <DialogActions>
                <Button 
                        onClick={addParam}
                    >
                        Add Param
                </Button>
                <Button 
                        onClick={modifyTestAction}
                    >
                        Submit
                </Button>
                <Button onClick={()=>props.setOpen(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}