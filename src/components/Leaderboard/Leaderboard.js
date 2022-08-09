import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import Score from "./Score";
import Stars from "./Stars"
import { useSelector } from "react-redux";
import endpoints from "../../utils/APIendpoints";
const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState([]);
  const token = useSelector((state) => state.token.value);
  console.log(token);
  const getLeaderboard = () => {
    fetch(endpoints.LEADERBOARD, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLeaderboard(res.leaderboard);
      });
  };

  useEffect(getLeaderboard, [token])
  return (
    
    <div>
      <div className="img">
        <div>
          <h1>Leaderboard</h1>
        </div>
        
        {
          leaderboard.length !== 0 ? <>{leaderboard.map((elem, index) => <Score name={elem.name} score={elem.points} key={index} />)}</> : <span>Loading...</span>
        }
        <Stars />
      </div>
    </div>
  );
};

export default Leaderboard;
