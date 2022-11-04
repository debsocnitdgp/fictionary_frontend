import "./Score.css";
const Score = (props) => {
  return (
    <div className="scores">
      <div className="score">
        <div className="start">
          <img
            src={props.avatar}
            alt=""
            className="score-avatar"
          />
          <h3>{props.name}</h3>
        </div>
        <h3>{props.score}</h3>
      </div>
    </div>
  );
};

export default Score;
