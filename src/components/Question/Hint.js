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
            console.log("notAvailable");
            setDisabled(true);
            console.log("setting timer to " + serverResponse.timeleft);
            setCountdown(serverResponse.timeleft);
          }
        }
      });
    });
  };
  useEffect(update, [token]);

  return (
    <div
      className={`hint_bg ${disabled ? styles.disabled : ""}`}
      onClick={
        disabled
          ? () => {}
          : () => {
              props.onClick();
              setTimeout(update, 1000);
            }
      }
    >
      <button className="hint">
        HINT{" "}
        {disabled && (
          <span style={{ fontSize: "xx-small" }}>
            (
            {((cnt) => {
              var seconds = cnt % 60;
              var minutes = (cnt - seconds) / 60;
              minutes = minutes < 10 ? "0" + minutes : minutes;
              seconds = seconds < 10 ? "0" + seconds : seconds;
              return minutes + ":" + seconds;
            })(countdown)}
            )
          </span>
        )}
      </button>
    </div>
  );
}
