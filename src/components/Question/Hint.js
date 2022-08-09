import { useEffect, useState } from "react";
import styles from "./Hint.module.css";
import { useSelector } from "react-redux";
import endpoints from "../../utils/APIendpoints";

export default function Hint(props) {
  const [disabled, setDisabled] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    if (countdown !== null && disabled) {
      if (countdown > 0) {
        setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        update();
      }
    }
  }, [countdown, disabled]);
  const update = () => {
    fetch(endpoints.CHECK_HINT_AVAILABLE, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((res) => {
      res.json().then((serverResponse) => {
        if (res.status === 200) {
          console.log(serverResponse);
          if (serverResponse.available) {
            setDisabled(false);
          } else {
            console.log('notAvailable')
            setDisabled(true);
            console.log('setting timer to ' + serverResponse.timeleft)
            setCountdown(serverResponse.timeleft);
          }
        }
      });
    });
  };
  useEffect(update, [token]);

  return (
    <div
      className={`${styles.container} ${disabled ? styles.disabled : ""}`}
      onClick={
        disabled
          ? () => {}
          : () => {
              props.onClick();
              setTimeout(update, 1000);
            }
      }
    >
      <svg
        width="120"
        viewBox="0 0 249 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M3.00005 3L242.098 3L180.262 58L3.00005 58L3.00005 3Z"
            fill="#033D50"
          />
          <path
            d="M3.00005 3L242.098 3L180.262 58L3.00005 58L3.00005 3Z"
            stroke="#58A1B9"
            stroke-width="5"
          />
        </g>
      </svg>
      <span
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          transform: "translate(-40%, -40%)",
          fontSize: "small",
          fontWeight: 900,
        }}
      >
        HINT{" "}
        {disabled && (
          <span style={{fontSize: 'xx-small'}}>
            (
            {countdown < 10
              ? "00" + countdown
              : countdown < 100
              ? "0" + countdown
              : countdown}
            )
          </span>
        )}
      </span>
    </div>
  );
}
