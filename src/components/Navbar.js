import { Link } from "react-router-dom";
import "./Navbar.css";
import Rules from "./Rules/Rules";
import React, { useState } from "react";
import endpoints from "../utils/APIendpoints";

const Navbar = (props) => {
  const [modalOpen, setmodalOpen] = useState(false);

  const showModalHandler = () => {
    setmodalOpen(true);
    console.log("true");
  };
  const hideModalHandler = () => {
    setmodalOpen(false);
    console.log("false");
  };

  const handleGoogleLogin = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = endpoints.GOOGLE_LOGIN;
    document.body.appendChild(form);
    form.submit();
  };
  return (
    <>
      <nav className="main-nav">
        {modalOpen && <Rules onHideRules={hideModalHandler} />}
        <button onClick={props.showNav} className="open_btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="open"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>

        <div className="middle">
          <div className="home">
            <ul>
              <Link to="/">Home</Link>
            </ul>
          </div>

          <div className="rules">
            <ul>
              <p className="rules" onClick={showModalHandler}>
                Rules
              </p>
            </ul>
          </div>

          <div className="leader">
            <ul>
              <Link to="/leaderboard">Leaderboard</Link>
            </ul>
          </div>
        </div>

        <div className="sign" onClick={handleGoogleLogin}>
          <button className="si">SIGN IN</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
