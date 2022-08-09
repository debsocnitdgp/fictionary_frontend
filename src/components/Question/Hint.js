import { useEffect, useState } from "react";
import styles from "./Hint.module.css";
import { useSelector } from "react-redux";
import endpoints from "../../utils/APIendpoints";
import { handleGoogleLogin } from "../Login/Login";

export default function Hint(props) {
  const [disabled, setDisabled] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    if (countdown !== null && disabled) {
      if (countdown > 0) {
        setTimeout(() => setCountdown(0), countdown * 1000);
      } else {
        update();
      }
    }
  }, [countdown, disabled]);
  const update = () => {
    fetch(endpoints.CHECK_HINT_AVAILABLE, {
      headers: {
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      if (res.status === 401) {
        handleGoogleLogin();
      }
      res.json().then((serverResponse) => {
        if (res.status === 200) {
          console.log(serverResponse);
          if (serverResponse.available) {
            setDisabled(false);
          } else {
            setDisabled(true);
            setCountdown(serverResponse.timeleft);
          }
        }
      });
    });
  };
  useEffect(update, [token]);

  return (
    <div
      className={`hint_bg ${disabled ? `${styles.disabled} disabled` : ""}`}
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
        HINT
      </button>
    </div>
  );
}
