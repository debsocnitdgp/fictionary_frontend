import React, { useState, Fragment, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = ({ timer }) => {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  useEffect(() => {
    const countDownDate = new Date("November 4,2022").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();

      var distance = countDownDate - now;

      if (distance < 0) {
        //Stop Timer

        clearInterval(interval);
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
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <section className={styles.timercontainer}>
        <section className={styles.timer}>
          <div className={styles.clock}>
            <section>
              <p>{timerDays}</p>
              <small>Days</small>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <small>Hours</small>
            </section>{" "}
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <small>Minutes</small>
            </section>{" "}
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <small>Seconds</small>
            </section>
          </div>
        </section>
      </section>
    </Fragment>
  );
};

Timer.defaultProps = {
  timerDays: 10,
  timerHours: 10,
  timerMinutes: 10,
  timerSeconds: 10,
};
export default Timer;
