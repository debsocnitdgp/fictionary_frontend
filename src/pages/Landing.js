import React from "react";
import "./Landing.css";
import "./Leaderboard/Stars";
import Stars from "./Leaderboard/Stars";
import Timer from "../components/Timer";
import ENDPOINTS from "../utils/APIendpoints";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useContext from "../utils/Context";
import { useGoogleLogin } from "@react-oauth/google";
import endpoints from "../utils/APIendpoints";

const Landing = () => {
  const [gameLive, setGameLive] = useState({
    game_live: true,
    date: new Date(),
  });

  const context = useContext();
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
  const navigate = useNavigate();

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

  useEffect(() => {
    refresh();
    console.log("refreshing");
  }, []);
  return (
    <>
      <div className="landing-container">
        <div>
          <h1 className="fic">FICTIONARY </h1>
        </div>
        {context.token || localStorage.getItem("fictionary_frontend") ? (
          gameLive.game_live ? (
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
              <Timer timer={new Date(gameLive.date)} refresh={refresh} />
              {new URLSearchParams(window.location.search).get("redirected") ===
                "true" && (
                <div className="game-not-live">The game is not live yet!</div>
              )}
            </div>
          )
        ) : (
          <div className="landing-sign-wrapper">
            <button className="landing-sign-in" onClick={handleGoogleLogin}>
              Sign In
            </button>
          </div>
        )}
      </div>
      <Stars />
    </>
  );
};

export default Landing;
