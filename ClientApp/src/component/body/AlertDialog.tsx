import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Button } from 'react-bootstrap';


import '../../css/Dialog.scss'

export default function AlertDialog (
    props:{
        open:boolean,
        setOpen:(open:boolean)=>void,
        title:string,
        contents?:any,
        button?:any,
    }
){



    return (
        <Dialog
            open={props.open}
            onClose={()=>props.setOpen(false)}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>
                {
                    props.contents&&props.contents
                }
            </DialogContent>
            <DialogActions>
                {
                    props.button&&props.button
                }
                <Button onClick={()=>props.setOpen(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}