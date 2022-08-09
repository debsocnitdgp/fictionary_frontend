import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import Score from "./Score";
import Stars from "./Stars";
import { useSelector } from "react-redux";
import endpoints from "../../utils/APIendpoints";
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const token = useSelector((state) => state.token.value);
  const getLeaderboard = () => {
    console.log(token);
    fetch(endpoints.LEADERBOARD, {
      headers: {
        Authorization: `Token ${token || localStorage.getItem('fictionary_token')}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLeaderboard(res.leaderboard);
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
                <Score name={elem.name} score={elem.points} key={index} />
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
