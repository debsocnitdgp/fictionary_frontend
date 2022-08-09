import React from "react";
import "./Question.css";
import HintButton from "./Hint";
import endpoints from "../../utils/APIendpoints";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import HintModal from "./HintModal";
import SnackBar from "./SnackBar";
import { handleGoogleLogin } from "../Login/Login";

const Question = () => {
  const [state, setState] = React.useState({
    question: { text: "Loading...", round: 0 },
  });
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState({
    show: false,
    text: "",
    success: false,
  });
  const [hintCountdown, setHintCountdown] = useState(null);
  const token = useSelector((state) => state.token.value);
  const getQuestion = () => {
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
        setState({
          question: res,
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

  const updateHint = () => {
    fetch(endpoints.CHECK_HINT_AVAILABLE, {
      headers: {
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      res.json().then((serverResponse) => {
        if (res.status === 200) {
          console.log(serverResponse);
          if (serverResponse.available) {
            setHintCountdown(null);
          } else {
            setHintCountdown(serverResponse.timeleft);
          }
        }
      });
    });
  };

  useEffect(() => {
    if (hintCountdown !== null) {
      if (hintCountdown > 0) {
        setTimeout(() => setHintCountdown(hintCountdown - 1), 1000);
      } else {
        updateHint();
      }
    }
  }, [hintCountdown]);

  useEffect(updateHint, [token]);

  React.useEffect(getQuestion, [token]);

  return (
    <div>
      <HintModal open={hintModalOpen} onClose={() => setHintModalOpen(false)} />
      <SnackBar
        show={snackbarOptions.show}
        text={snackbarOptions.text}
        success={snackbarOptions.success}
      />
      <div className="ques">
        <section>
          <div className="ques-box">
            <div className="round_bg">
              <div className="round">R-{state.question.round}</div>
            </div>
            {/* <p className="question">{state.question.text}</p> */}
            <p className="question">
              ife is a beautiful journey that is meant to be embraced to the
              fullest every day. However, that doesn't mean you always wake up
              ready to seize the day, and sometimes need a reminder that life is
              a great gift. Whether a funny quote from a famous celebrity or an
              encouraging message about giving it your best from a s
            </p>

            <input
              className="answer"
              id="answerInput"
              type="text"
              placeholder="type your answer  here"
            />
            {(() => {
              if (hintCountdown) {
                var seconds = hintCountdown % 60;
                var minutes = (hintCountdown - seconds) / 60;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                return (
                  <span
                    style={{
                      textAlign: "center",
                      fontSize: "small",
                      marginTop: "12px",
                    }}
                  >
                    Hint available in <br /> {minutes + "m " + seconds + "s"}
                  </span>
                );
              }
            })()}
           
          </div>
          <div className="btns">
              {/* <HintButton onClick={() => setHintModalOpen(true)} /> */}

              <div className="hint_bg" onClick={checkAnswer}>
                <button className="hint">HINT</button>
              </div>
              <div className="submit_bg" onClick={checkAnswer}>
                <button className="submit">SUBMIT</button>
              </div>
            </div>
        </section>
        
      </div>
    </div>
  );
};
export default Question;
