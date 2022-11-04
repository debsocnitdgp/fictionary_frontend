import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import Score from "./Score";
import Stars from "./Stars";
import useContext from "../../utils/Context";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";

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

  useEffect(getLeaderboard, [token]);
  return (
    <div>
      <div className="img">
        <div className="leaderboardItems">
          <h1 className="leaderboardHeader">Leaderboard</h1>
          {leaderboard.length !== 0 ? (
            <>
              {leaderboard.map((elem, index) => (
                <Score
                  className="score"
                  name={elem.name}
                  score={elem.points}
                  avatar={elem.avatar}
                  key={index}
                />
              ))}
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <Stars />
      </div>
    </div>
  );
};

export default Leaderboard;
