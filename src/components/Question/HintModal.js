import styles from "./HintModal.module.css";
import { useState, useEffect } from "react";
import endpoints from "../../utils/APIendpoints";
import useContext from "../../utils/Context";

export default function HintModal(props) {
  const [modalOpen, setmodalOpen] = useState(props.open);
  const [loaded, setLoaded] = useState(false);
  const [clue, setClue] = useState(null);
  const token = useContext().token;

  useEffect(() => {
    const getClue = () => {
      fetch(endpoints.CLUE, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        res.json().then((serverResponse) => {
          if (res.status === 200) {
            setLoaded(true);
            if (serverResponse.success) {
              setClue(serverResponse.clue);
            } else {
              setClue([serverResponse.message]);
            }
          }
        });
      });
    };
    setmodalOpen(props.open);
    setLoaded(false);
    if (props.open) {
      getClue();
    }
  }, [props, token]);
  const handleClick = (evt) => {
    if (evt.target !== document.getElementById("hintModalBox")) {
      setmodalOpen(false);
      props.onClose();
    }
  };
  return (
    <div
      className={styles.rules1}
      style={{ display: modalOpen ? "block" : "none" }}
      onClick={handleClick}
    >
      <div id="hintModalBox" className={styles.modal}>
        {(() => {
          if (loaded) {
            return (
              <>
                <h2 className={styles.h2}>Clue</h2>
                <p className={styles.p}>{clue}</p>
              </>
            );
          } else {
            return <h2 className={styles.h2}>Loading...</h2>;
          }
        })()}
      </div>
    </div>
  );
}
