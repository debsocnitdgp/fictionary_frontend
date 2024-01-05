import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Rules from "./Rules/Rules";
import React, { useState } from "react";
import useContext from "../utils/Context";
import { useGoogleLogin } from "@react-oauth/google";
import endpoints from "../utils/APIendpoints";
import Google from "./GoogleIcon";

const Navbar = (props) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const context = useContext()
  const navigate = useNavigate();
  

  const showModalHandler = () => {
    setmodalOpen(true);
  };
  const hideModalHandler = () => {
    setmodalOpen(false);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // setMessage("Fetching your information from Google...");
      fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
          tokenResponse.access_token
      )
        .then((json) => json.json())
        .then((res) => {
          // setMessage("Signing you in...");
          fetch(endpoints.SOCIAL_LOGIN_TOKEN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
              ...res,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              // setMessage("Logged in succesfully. Redirecting...");
              context.login(res.token);
              navigate("/question");
            })
            .catch((err) => console.error(err));
        });
    },
    onFailure: (error) => {
      console.log(error);
    },
  });

  const handleLogOut = () => {
    context.logout();
    navigate("/");
  };
  return (
    <>
      <nav className="main-nav">
        {modalOpen && <Rules onHideRules={hideModalHandler} />}
        <div className="mobile-nav">
          <button onClick={props.showNav} className="open_btn" id="mobile-nav-openbtn">
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
        </div>
        <div className="button" to="/">
          FICTIONARY
        </div>
        <div className="middle">
          <div className="home vanish">
            <ul>
              <Link className="button" to="/question">
                PLAY
              </Link>
            </ul>
          </div>

          <div className="test vanish">
            <ul>
              <a className="rules" onClick={showModalHandler}>
                RULES
              </a>
            </ul>
          </div>

          <div className="leader vanish">
            <ul>
              <Link className="button" to="/leaderboard">
                LEADERBOARD
              </Link>
            </ul>
          </div>
        </div>

        {context.token || localStorage.getItem("fictionary_frontend") ? (
          <div className="sign" onClick={handleLogOut}>
            <button className="si">LOG OUT</button>
          </div>
        ) : (
          <div className="sign" >
            <button className="si" onClick={handleGoogleLogin}><Google width={12} /> SIGN IN</button>
          </div>
        ) }
      </nav>
    </>
  );
};

export default Navbar;
