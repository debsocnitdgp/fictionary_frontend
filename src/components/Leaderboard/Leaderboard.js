import React from "react";
import "./Leaderboard.css";
import Score from "./Score";

const Leaderboard = () => {
  return (
    <div>
      <div className="img">
        <div>
          <h1>Leaderboard</h1>
        </div>
        <Score/>
      </div>
    </div> 
  );
};

export default Leaderboard;
