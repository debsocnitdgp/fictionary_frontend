import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Rules from "./Rules/Rules";
import React, { useState } from "react";
import endpoints from "../utils/APIendpoints";
import useContext from "../utils/Context";

const Navbar = (props) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const context = useContext()
  const navigate = useNavigate();

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
  const handleLogOut = () => {
    context.logout();
    navigate("/");
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
              <Link className="button" to="/">Home</Link>
            </ul>
          </div>

          <div className="test">
            <ul>
              <p className="rules" onClick={showModalHandler}>
                Rules
              </p>
            </ul>
          </div>

          <div className="leader">
            <ul>
              <Link className="button" to="/leaderboard">Leaderboard</Link>
            </ul>
          </div>
        </div>

        {context.token || localStorage.getItem("fictionary_frontend") ? (
          <div className="sign" onClick={handleLogOut}>
            <button className="si">LOG OUT</button>
          </div>
        ) : (
          <div className="sign" onClick={handleGoogleLogin}>
            <button className="si">SIGN IN</button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
