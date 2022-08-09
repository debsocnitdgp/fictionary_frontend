import "./Score.css";
const Score = (props) => {
  return (
    <div className="scores">
      <div className="score">
        <div className="start">
          <img
            src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
            alt=""
          />
          <h3>{props.name}</h3>
        </div>
        <h3>{props.score}</h3>
      </div>
    </div>
  );
};

export default Score;
