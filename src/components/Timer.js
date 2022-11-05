import React, { useState, Fragment, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = ({ timer, refresh }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countDownDate = timer;
    const interval = setInterval(() => {
      const now = new Date().getTime();

      var distance = countDownDate - now;

      if (distance < 0) {
        //Stop Timer

        clearInterval(interval);
        refresh();
      } else {
        distance /= 1000;

        const days = (distance - (distance % 86400)) / (24 * 60 * 60);
        distance -= days * (24 * 60 * 60);
        const hours = (distance - (distance % 3600)) / (60 * 60);
        distance -= hours * (60 * 60);

        const minutes = (distance - (distance % 60)) / 60;
        distance -= minutes * 60;

        const seconds = Math.round(distance);
        //update timer
        setTime({
          days: days < 10 ? '0' + days : days,
          hours: hours < 10 ? '0' + hours : hours,
          minutes: minutes < 10 ? '0' + minutes : minutes,
          seconds: seconds < 10 ? '0' + seconds : seconds
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.clock}>
        <div className={styles.element}>
          <p>{time.days}</p>
          <span>Days</span>
        </div>
        <span>:</span>
        <div className={styles.element}>
          <p>{time.hours}</p>
          <span>Hours</span>
        </div>
        <span>:</span>
        <div className={styles.element}>
          <p>{time.minutes}</p>
          <span>Minutes</span>
        </div>
        <span>:</span>
        <div className={styles.element}>
          <p>{time.seconds}</p>
          <span>Seconds</span>
        </div>
      </div>
    </>
  );
};

export default Timer;
