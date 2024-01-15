import React, { useMemo } from "react";
import "./Landing.css";
import "./Leaderboard/Stars";
import Timer from "../components/Timer";
import ENDPOINTS from "../utils/APIendpoints";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useContext from "../utils/Context";
import { useGoogleLogin } from "@react-oauth/google";
import endpoints from "../utils/APIendpoints";
import Google from "../components/GoogleIcon";

const Landing = () => {
  const [gameLive, setGameLive] = useState({
    game_live: false,
    time_up: false,
    date: new Date(),
  });

  const context = useContext();
  const refresh = useCallback(() => {
    fetch(ENDPOINTS.CHECK_GAME_LIVE).then((res) => {
      if (res.status === 200) {
        res.json().then((serverResponse) => {
          setGameLive(live => ({ ...live, ...serverResponse }));
        });
      }
    });
  }, []);
  const navigate = useNavigate();
  const timeoutDate = useMemo(() => gameLive.date, [gameLive]);

  //   const createFirefly = () => {
  //   const firefly = document.createElement('div');
  //   firefly.className = 'firefly';
  //   document.body.appendChild(firefly);

  //   const fireflySize = Math.random() * 10 + 5;
  //   firefly.style.width = `${fireflySize}px`;
  //   firefly.style.height = `${fireflySize}px`;
  //   firefly.style.backgroundColor = '#FFA500';
  //   firefly.style.borderRadius = '50%';
  //   firefly.style.opacity = '0.8';
  //   firefly.style.boxShadow = '0 0 10px 5px #FFA500';

  //   const animationDuration = Math.random() * 5 + 5;
  //   const randomX = Math.random() * window.innerWidth;
  //   const randomY = Math.random() * window.innerHeight;
  //   firefly.style.left = `${randomX}px`;
  //   firefly.style.top = `${randomY}px`;

  //   setTimeout(() => {
  //     firefly.remove();
  //   }, animationDuration * 1000);
  // };

  //   setInterval(createFirefly, 1000);

  window.addEventListener("DOMContentLoaded", (event) => {
    const container = document.createElement("div");
    container.classList.add("firefly-container");
    document.body.appendChild(container);

    function createFirefly() {
      const firefly = document.createElement("div");
      firefly.classList.add("firefly");
      const size = Math.random() * 6 + 4;
      firefly.style.width = size + "px";
      firefly.style.height = size + "px";
      const x = Math.random() * (window.innerWidth - 80) + 40;
      const y = Math.random() * (window.innerHeight - 80) + 40;
      firefly.style.left = x + "px";
      firefly.style.top = y + "px";
      container.appendChild(firefly);

      const duration = Math.random() * 3 + 1;
      const delay = Math.random() * 2;
      const angle = Math.random() * 360;
      firefly.style.animation = `blink ${duration}s ${delay}s infinite, flying 10s linear infinite`;
      firefly.style.transform = `rotate(${angle}deg)`;
      firefly.addEventListener("animationiteration", () => {
        container.removeChild(firefly);
      });
    }

    setInterval(createFirefly, 150);
  });

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
              {gameLive.time_up ? (
                <div className="time-up">
                  <p>
                    <div>
                      Fictionary has ended now!
                      <br />
                      But wait, that's not the end!
                      <br />
                      <br />
                      <br />
                      The decision is your own voice, an opinion is the echo of
                      someone else's voice: Choose the right one.
                    </div>
                    <div
                      className="landing-sign-wrapper"
                      style={{ marginTop: "32px" }}
                    >
                      {/* <button
                        className="landing-sign-in-2"
                        onClick={() => {
                          const a = document.createElement("a");
                          a.setAttribute(
                            "href",
                            "https://www.instagram.com/p/CnKig3ESL81/?igshid=NDk5N2NlZjQ="
                          );
                          a.setAttribute("_target", "blank");
                          document.body.appendChild(a);
                          console.log("done");
                          a.click();
                        }}
                      >
                        What's Next?
                      </button> */}
                    </div>
                  </p>
                </div>
              ) : (
                <>
                  <Timer timer={timeoutDate} refresh={refresh} />
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
          <>
            <div className="ComSoon">
              {/* <h2 className="ComSoon">Coming Soon </h2> */}
              {/* <Typewriter
                className="ComSoon"
                options={{
                  strings: ["Coming Soon"],
                  autoStart: true,
                  loop: true,
                }}
              /> */}
            </div>
            <div className="landing-sign-wrapper">
              <button className="landing-sign-in" onClick={handleGoogleLogin}>
                <Google width="24" />
                Sign In
              </button>
            </div>
          </>
        )}
      </div>
      {/* <Stars /> */}
    </>
  );
};

export default Landing;
