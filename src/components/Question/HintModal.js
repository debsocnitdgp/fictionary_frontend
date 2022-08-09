import styles from "./HintModal.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import endpoints from "../../utils/APIendpoints";

export default function HintModal(props) {
  const [modalOpen, setmodalOpen] = useState(props.open);
  const [loaded, setLoaded] = useState(false);
  const [clues, setClues] = useState([]);
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    const getClues = () => {
      fetch(endpoints.CLUE, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        res.json().then((serverResponse) => {
          if (res.status === 200) {
            if (serverResponse.success) {
              setClues(serverResponse.clues);
              setLoaded(true);
            } else {
              setLoaded(true);
              setClues([serverResponse.message]);
            }
          }
        });
      });
    };
    setmodalOpen(props.open);
    setLoaded(false);
    if (props.open) {
      getClues();
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
                <h2 className={styles.h2}>Clues</h2>
                {clues.map((elem, index) => (
                  <p key={index} className={styles.p}>
                    {index + 1}. {elem}
                  </p>
                ))}
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
