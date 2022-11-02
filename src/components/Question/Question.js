import React from "react";
import "./Question.css";
import endpoints from "../../utils/APIendpoints";
import { useState } from "react";
import HintModal from "./HintModal";
import SnackBar from "./SnackBar";
import { handleGoogleLogin } from "../Login/Login";
import HintCountDown from "./HintCountDown";
import useContext from "../../utils/Context";

const Question = () => {
  const [state, setState] = React.useState({
    question: { text: "Loading...", round: 0 },

    loaded: true,
  });
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState({
    show: false,
    text: "",
    success: false,
  });
  const [hintCountdown, setHintCountdown] = useState(null);
  const [timer, setTimer] = useState(0);
  const token = useContext().token;
  const updateHint = () => {
    console.log("updating hint");
    fetch(endpoints.CHECK_HINT_AVAILABLE, {
      headers: {
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      res.json().then((serverResponse) => {
        if (res.status === 200) {
          clearTimeout(timer);
          console.log(hintCountdown + " " + timer);
          if (serverResponse.available) {
            setHintCountdown(null);
          } else {
            setTimer(setTimeout(updateHint, serverResponse.timeleft * 1000));
            setHintCountdown(serverResponse.timeleft);
          }
        }
      });
    });
  };

  const getQuestion = () => {
    setState({ ...state, loaded: false });
    fetch(endpoints.QUESTION, {
      headers: {
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      if (res.status === 401) {
        handleGoogleLogin();
      }
      res.json().then((res) => {
        clearInterval(timer);
        updateHint();
        setState({
          question: res,
          loaded: true,
        });
      });
    });
  };

  const checkAnswer = () => {
    const answer = document.getElementById("answerInput");
    fetch(endpoints.ANSWER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
      },
      body: JSON.stringify({ answer: answer.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          answer.value = "";
          setSnackbarOptions({
            show: true,
            text: "Correct Answer!!",
            success: true,
          });
          setTimeout(
            () =>
              setSnackbarOptions({
                show: false,
                text: "Correct Answer!!",
                success: true,
              }),
            3000
          );
          getQuestion();
        } else {
          setSnackbarOptions({
            show: true,
            text: "Wrong Answer. Please try again.",
            success: false,
          });
          setTimeout(
            () =>
              setSnackbarOptions({
                show: false,
                text: "Wrong Answer. Please try again.",
                success: false,
              }),
            3000
          );
        }
      });
  };

  React.useEffect(getQuestion, [token]);

  return (
    <div>
      <HintModal
        open={hintModalOpen}
        onClose={() => {
          setHintModalOpen(false);
        }}
      />
      <SnackBar
        show={snackbarOptions.show}
        text={snackbarOptions.text}
        success={snackbarOptions.success}
      />
      <div className="ques">
        <section className="ques-container">
          {state.loaded ? (
            <>
              <div className="ques-box">
                <div className="round_bg">
                  <div className="round">R-{state.question.round}</div>
                </div>
                <p className="question">{state.question.text}</p>
                <input
                  className="answer"
                  id="answerInput"
                  type="text"
                  placeholder="type your answer  here"
                />
                {hintCountdown && (
                  <HintCountDown time={hintCountdown} id={timer} />
                )}
              </div>
              <div className="btns">
                <div
                  className={`hint_bg ${
                    hintCountdown !== null ? "hintDisabled" : ""
                  }`}
                  onClick={
                    hintCountdown !== null
                      ? () => {}
                      : () => setHintModalOpen(true)
                  }
                >
                  <button className="hint">HINT</button>
                </div>
                <div className="submit_bg" onClick={checkAnswer}>
                  <button className="submit">SUBMIT</button>
                </div>
              </div>
            </>
          ) : (
            <div className="box">
              <span>L</span>
              <span>O</span>
              <span>A</span>
              <span>D</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export default Question;
