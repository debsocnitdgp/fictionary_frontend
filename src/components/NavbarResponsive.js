import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarResponsive.css";
import Rules from "./Rules/Rules";

const NavbarResponsive = (props) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const showModalHandler = () => {
    setmodalOpen(true);
  };
  const hideModalHandler = () => {
    setmodalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", (evt) => {
      const elem = document.getElementById("mobile-nav");
      // const elem2 = document.getElementById("mobile-nav-openbtn");
      // console.log(evt.target === elem2);
      // console.log(evt);
      if (elem && evt.target === elem) {
        props.hideNav();
      }
    });
  }, [props]);

  return (
    <div
      className={props.nav ? "navbar_collapse_show" : "navbar_collapse_hide"}
      id="mobile-nav"
    >
      {modalOpen && <Rules onHideRules={hideModalHandler} />}
      <div className="nav-content">
        <button className="close_btn" onClick={props.hideNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="close"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="nav-wrapper">
          <div className="nav">
            <Link to="/question" className="link" onClick={props.hideNav}>
              PLAY
            </Link>
            <a
              href="#"
              className="Rules"
              onClick={() => {
                showModalHandler();
                props.hideNav();
              }}
            >
              RULES
            </a>
            <Link to="/leaderboard" className="link" onClick={props.hideNav}>
              LEADERBOARD
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavbarResponsive;
