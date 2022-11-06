import React from "react";
import "./Landing.css";
import "./Leaderboard/Stars";
import Stars from "./Leaderboard/Stars";
import Timer from "../components/Timer";
import ENDPOINTS from "../utils/APIendpoints";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [gameLive, setGameLive] = useState({
    game_live: true,
    date: new Date(),
  });
  const refresh = () => {
    fetch(ENDPOINTS.CHECK_GAME_LIVE).then((res) => {
      if (res.status === 200) {
        res.json().then((serverResponse) => {
          setGameLive(serverResponse);
          console.log(serverResponse);
        });
      }
    });
  };

  useEffect(() => { refresh();console.log("refreshing") }, []);
  return (
    <div className="landing-container">
      <div>
        <h1 className="fic">FICTIONARY </h1>
        <Stars />
      </div>
      { false ? (
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
      ) : (
        <div className="time">
          <Timer timer={new Date(gameLive.date)} refresh={refresh}/>
          {new URLSearchParams(window.location.search).get("redirected") ===
            "true" && (
            <div className="game-not-live">The game is not live yet!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Landing;
