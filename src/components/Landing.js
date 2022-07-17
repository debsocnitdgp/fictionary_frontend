import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';



const Landing = () => {
  return (
    <div>
    <div>
      <h1 className="fic">FICTIONARY </h1>
    </div>
    <div className='play'>
        <Link to='/question'>PLAY NOW </Link>
    </div>



    </div>

    
  );
}

export default Landing;
