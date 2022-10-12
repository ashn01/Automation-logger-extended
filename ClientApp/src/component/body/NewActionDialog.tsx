import { DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


import '../../css/Dialog.scss'
import { TestActionValue, TestStep } from '../../interface/interface';

export default function NewActionDialog (
    props:{
        open:boolean,
        setOpen:(open:boolean)=>void,
        updateTestAction:(testActions:Array<TestStep>)=>void
    }
){

    // when: dialog open or close
    useEffect(()=>{
        console.log("open")
        setNewTestActionValues([]);

    }, [props.open])

    // new action
    const [newAction, setNewAction] = useState<string>('');
    // new action script
    const [newActionScript, setNewActionScript] = useState<string>('');
    // new testActionValue
    const [newTestActionValues, setNewTestActionValues] = useState<Array<TestActionValue>>([])

    // add new param field in dialog
    const addParam = () =>{
        const newArray = [...newTestActionValues];
        let newActionValue:TestActionValue = {name:"", defaultValue:"", order:newArray.length}
        newArray.push(newActionValue)

        setNewTestActionValues(newArray)
    }

    // submit test action to the server
    const addTestAction = () =>{
        const newTestAction:TestStep = {
            action: newAction,
            code: newActionScript,
            testActionValues: newTestActionValues
        }
        console.log(newTestAction)
        axios.post(`/api/teststep`,newTestAction)
        .then(res=>{
            // console.log(res.data)
            props.updateTestAction(res.data)
            props.setOpen(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // when: test action name changes
    const onChangeActionName = (name:string, index:number) =>{
        const newArray = [...newTestActionValues];
        newArray[index].name = name;
        setNewTestActionValues(newArray)
    }

    // when: test action value changes
    const onChangeActionValue = (value:string, index:number) =>{
        const newArray = [...newTestActionValues];
        newArray[index].defaultValue = value;
        setNewTestActionValues(newArray)
    }

    return (
        <Dialog
            open={props.open}
            onClose={()=>props.setOpen(false)}
        >
            <DialogTitle>
                New test action
            </DialogTitle>
            <DialogContent>
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
                        {
                            newTestActionValues.map((action, key)=>{
                                return (
                                    <div id={`action-params`}>
                                        <TextField
                                                key={`name-${key}`}
                                                label={`Name`}
                                                value={action.name}
                                                onChange={e=>onChangeActionName(e.target.value,key)}
                                            />
                                        <TextField
                                                key={`value-${key}`}
                                                label={`Default value`}
                                                value={action.defaultValue}
                                                onChange={e=>onChangeActionValue(e.target.value,key)}
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
                        onClick={addTestAction}
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