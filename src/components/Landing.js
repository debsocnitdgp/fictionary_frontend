import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import './Leaderboard/Stars'
import Stars from "./Leaderboard/Stars";

const Landing = () => {
  return (
    <div>
      <div>
        <h1 className="fic">FICTIONARY </h1>
        <Stars />
      </div>
      <div className="play_now">
        <Link to="/question" className="play">
          PLAY NOW
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
