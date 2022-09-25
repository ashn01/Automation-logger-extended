import {Nav} from 'react-bootstrap'

import '../../css/header.css'


export default function Header(props:{nav:number, setNav:(arg:number)=>void}){


    return(
        <Nav variant="pills" id="nav">
            <Nav.Item>
                <Nav.Link active={props.nav === 0} onClick={()=>props.setNav(0)}>Test results</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link active={props.nav === 1} onClick={()=>props.setNav(1)}>Automator</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}