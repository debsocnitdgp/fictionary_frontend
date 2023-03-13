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
import Google from "../components/GoogleIcon";
import { useGlitch } from "react-powerglitch";
const Landing = () => {
  const [gameLive, setGameLive] = useState({
    game_live: true,
    time_up: false,
    date: new Date(),
  });
  const glitch = useGlitch();

  const context = useContext();
  const refresh = () => {
    fetch(ENDPOINTS.CHECK_GAME_LIVE).then((res) => {
      if (res.status === 200) {
        res.json().then((serverResponse) => {
          setGameLive({ ...gameLive, ...serverResponse });
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
  }, []);
  return (
    <>
      <div className="landing-container">
        <div>
          <h1 className="fic" ref={glitch.ref}>TRIVIOSITY </h1>
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
              {gameLive.time_up ? (
                <div className="time-up">
                  <p>
                    <div>
                      Fictionary has ended now!
                      <br />
                      But wait, that's not the end!
                      <br />
                      <br/>
                      <br />
                      The decision is your own voice, an opinion is the echo of
                      someone else's voice: Choose the right one.
                    </div>
                    <div className="landing-sign-wrapper" style={{marginTop: "32px"}}>
                      <button
                        className="landing-sign-in-2"
                        onClick={() => {
                          const a = document.createElement('a');
                          a.setAttribute("href", "https://www.instagram.com/p/CnKig3ESL81/?igshid=NDk5N2NlZjQ=");
                          a.setAttribute("_target", "blank");
                          document.body.appendChild(a);
                          console.log("done")
                          a.click()
                        }}
                      >
                        What's Next?
                      </button>
                    </div>
                  </p>
                </div>
              ) : (
                <>
                  <Timer timer={new Date(gameLive.date)} refresh={refresh} />
                  {new URLSearchParams(window.location.search).get(
                    "redirected"
                  ) === "true" && (
                    <div className="game-not-live">
                      The game is not live yet!
                    </div>
                  )}
                </>
              )}
            </div>
          )
        ) : (
          <div className="landing-sign-wrapper">
            <button className="landing-sign-in" onClick={handleGoogleLogin}>
              <Google width="24" />
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
