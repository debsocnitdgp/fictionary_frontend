import React from "react";
import "./Leaderboard.css";
import Score from "./Score";
import Stars from "./Stars"
const Leaderboard = () => {
  return (
    
    <div>
      <div className="img">
        <div>
          <h1>Leaderboard</h1>
        </div>
        
        <Score />
        <Stars />
      </div>
    </div>
  );
};

export default Leaderboard;
