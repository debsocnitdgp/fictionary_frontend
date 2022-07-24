
import './Rules.css';
import React, {useState,useEffect} from 'react';


const Rules = (props) => {
    const [modalOpen , setmodalOpen]=useState(props.open)
    console.log(props.open);
    console.log(modalOpen);
    useEffect (()=>{setmodalOpen(props.open)},[props])
    const handleClick = (evt) => {
if(evt.target !=document.getElementById('modalBox')){
setmodalOpen(false) 
props.handleclose()}}
  return (
    <div className="rules1" style={{display: modalOpen ? "block" : "none"}} onClick={handleClick}>
      <div  id="modalBox" className={'modal'} >
        <h2>Rules</h2>
        <p>1-Rule 1</p>
        <p>2-Rule is rule</p>
      </div>
    </div>
  );
}

export default Rules;
