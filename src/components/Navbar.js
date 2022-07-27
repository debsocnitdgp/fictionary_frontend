
import { Link } from 'react-router-dom';
import "./Navbar.css"
import Rules from './Rules/Rules';
import React, { useState } from "react";


const Navbar = (props) => {
      const [modalOpen, setmodalOpen] = useState(false);

  return (
   <>
      <nav className="main-nav">

      <button onClick={props.showNav} className='open_btn'>
          <svg xmlns="http://www.w3.org/2000/svg" className="open" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>

        <div className='middle'>
        <div className="home">
          <ul>
            <Link to="/">Home</Link>
          </ul>
        </div>
 
        <div className="rules">
          <ul>
            <Link to="# " onClick={()=>{console.log('rule');setmodalOpen(true)}}>Rules</Link>
          </ul>
        </div>

        <div className="leader">
          <ul>
            <Link to="/leaderboard">Leaderboard</Link>
          </ul>
        </div> 
        </div>
        

        <div className="sign">
        
            <button className="si">SIGN IN</button>
          
        </div>

      </nav>
      <Rules open={modalOpen} handleclose={()=>setmodalOpen(false)} />
      </>

      
  );
}

export default Navbar;
