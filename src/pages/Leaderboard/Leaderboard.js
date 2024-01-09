import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import Score from "./Score";
import Stars from "./Stars";
import useContext from "../../utils/Context";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const token = useContext().token;
  const navigate = useNavigate();
  const getLeaderboard = () => {
    fetch(endpoints.LEADERBOARD, {
      headers: {
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      if (res.status === 401) {
        navigate("/signin?redirected=true");
      } else {
        res.json().then((res) => {
          if (res.game_not_live) {
            navigate("/?redirected=true");
          } else {
            setLeaderboard(res.leaderboard);
          }
        });
      }
    });
  };

  window.addEventListener('DOMContentLoaded', (event) => {
    const container = document.createElement('div');
    container.classList.add('firefly-container');
    document.body.appendChild(container);
  
    function createFirefly() {
      const firefly = document.createElement('div');
      firefly.classList.add('firefly');
      const size = Math.random() * 6 + 4;
      firefly.style.width = size + 'px';
      firefly.style.height = size + 'px';
      const x = Math.random() * (window.innerWidth - 80) + 40;
      const y = Math.random() * (window.innerHeight - 80) + 40;
      firefly.style.left = x + 'px';
      firefly.style.top = y + 'px';
      container.appendChild(firefly);
  
      const duration = Math.random() * 3 + 1;
      const delay = Math.random() * 2;
      const angle = Math.random() * 360;
      firefly.style.animation = `blink ${duration}s ${delay}s infinite, flying 10s linear infinite`;
      firefly.style.transform = `rotate(${angle}deg)`; 
      firefly.addEventListener('animationiteration', () => {
          container.removeChild(firefly);
      });
  }
  
    setInterval(createFirefly, 150);
  });

  useEffect(getLeaderboard, [token]);
  return (
    <>
      <div className="leaderboardItems">
        <h1 className="leaderboardHeader" data-text="Leaderboard"><span>Leaderboard</span></h1>
        {leaderboard.length !== 0 ? (
          <>
            {leaderboard.map((elem, index) => (
              <Score
                className="score"
                name={elem.name}
                score={elem.points}
                avatar={elem.avatar}
                rank={index+1}
                key={index}
              />
            ))}
          </>
        ) : (
          <div className="loader">
            <ColorRing
              visible={true}
              height="135"
              width="135"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#f2e0d6", "#f2e0d6", "#f2e0d6", "#f2e0d6", "#f2e0d6"]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Leaderboard;
