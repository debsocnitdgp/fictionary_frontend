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
              var clue = serverResponse.clue;
              while (clue.indexOf("\n") > -1) {
                clue = clue.replace("\n", "<br />");
              }
              const start = clue.indexOf("__linkstart__");
              const end = clue.indexOf("__linkend__");
              if (start > -1 && end > -1) {
                clue =
                  clue.slice(0, start) +
                  '<a href="' +
                  clue.slice(start + 13, end) +
                  '" target="blank">' +
                  clue.slice(start + 13, end) +
                  "</a>" +
                  clue.slice(end + 11);
              }
              setClue(clue);
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
                <p className={styles.p} dangerouslySetInnerHTML={{__html: clue}}></p>
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
