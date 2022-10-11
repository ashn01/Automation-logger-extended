import { useState } from 'react'
import {Nav} from 'react-bootstrap'

import '../../css/header.css'


export default function Header(props:{nav:number, setNav:(arg:number)=>void}){
    const [nav, setNav] = useState<number>(props.nav);

    return(
        <Nav variant="pills" id="nav">
            <Nav.Item>
                <Nav.Link 
                    active={nav === 0} 
                    onClick={()=>{setNav(0); props.setNav(0);}}
                >Test results</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link 
                    active={nav === 1} 
                    onClick={()=>{setNav(1); props.setNav(1);}}
                >Automator</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}