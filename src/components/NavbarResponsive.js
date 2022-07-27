import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './NavbarResponsive.css'
import Rules from './Rules/Rules';

const NavbarResponsive = (props) => {

    const [modalOpen, setmodalOpen] = useState(false);

    return(
        <div className={props.nav ? 'navbar_collapse_show' : 'navbar_collapse_hide'}>
            <button className="close_btn" onClick={props.hideNav}>
                <svg xmlns="http://www.w3.org/2000/svg" className="close" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="nav">
            <Link to="/" className='link'>HOME</Link>
            <Link to="# " className='link' onClick={()=>{setmodalOpen(true)}}>RULES</Link>
            <Link to="/leaderboard" className='link'>LEADERBOARD</Link>
            </div>
            <Rules open={modalOpen} handleclose={()=>setmodalOpen(false)} />
        </div>
    )
}
export default NavbarResponsive