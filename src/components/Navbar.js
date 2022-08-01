
import { Link } from 'react-router-dom';
import "./Navbar.css"
import Rules from './Rules/Rules';
import React, { useState } from "react";
const Navbar = () => {
      const [modalOpen, setmodalOpen] = useState(false);

  return (
    <>
      <nav className="main-nav">
        <div className="home">
          <ul>
            <Link to="/">Home</Link>
          </ul>
        </div>

        <div className="rules">
          <ul>
            <Link
              to="# "
              onClick={() => {
                console.log("rule");
                setmodalOpen(true);
              }}
            >
              Rules
            </Link>
          </ul>
        </div>
        <div className="leader">
          <ul>
            <Link to="/leaderboard">Leaderboard</Link>
          </ul>
        </div>
        <div className="sign">
          <ul>
            <Link to="/signin">
              <button className="si">sign in</button>
            </Link>
          </ul>
        </div>
      </nav>
      <Rules open={modalOpen} handleclose={() => setmodalOpen(false)} />
    </>
  );
}

export default Navbar;
