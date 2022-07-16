import React from 'react';
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="main-nav">
      <div className="home">
        <ul>
          <a href="#"  >Home</a>
        </ul>
      </div>

      <div className="rules">
        <ul>
          <a href="#">Rules</a>
        </ul>
      </div>
      <div className="leader">
        <ul>
          <a href="#">Leaderboard</a>
          
        </ul>
      </div>
      <div className='sign'>
        <ul>
          <button className='si'>sign in</button>
        </ul>
      </div>
        
          
        
      
      
    
    </nav>
  );
}

export default Navbar;
