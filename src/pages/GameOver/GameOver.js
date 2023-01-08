import React, { useEffect, useState } from "react";
import styles from "./GameOver.module.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Congratulations!</h1>
        <div className={styles.message}>You have completed first round of questions</div>
        <div className={styles.message}>Come back today at 4pm for more!</div>
        <div className={styles.message}>Click below to view the leaderboard</div>
        <button className={styles.btn} onClick={() => navigate("/leaderboard")}>Go to Leaderboard</button>
      </div>
    </div>
  );
};

export default Login;
