import React from "react";
import "./Question.css";
import endpoints from "../../utils/APIendpoints";
import { useState } from "react";
import HintModal from "./HintModal";
import SnackBar from "./SnackBar";
import HintCountDown from "./HintCountDown";
import useContext from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import Stars from "../Leaderboard/Stars";

import { ColorRing } from "react-loader-spinner";

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

  const navigate = useNavigate();
  const context = useContext();

  const updateHint = () => {
    fetch(endpoints.CHECK_HINT_AVAILABLE, {
      headers: {
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      res.json().then((serverResponse) => {
        if (res.status === 200) {
          clearTimeout(timer);
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
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      if (res.status === 401) {
        context.logout();
        navigate("/signin?redirected=true");
      }
      res.json().then((res) => {
        if (res.game_not_live) {
          navigate("/?redirected=true");
        } else if (res.gameOver) {
          navigate("/game-finished");
        } else {
          clearInterval(timer);
          updateHint();
          setState({
            question: res,
            loaded: true,
          });
        }
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
          context.token || localStorage.getItem("fictionary_token")
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
              setSnackbarOptions((prev) => ({
                ...prev,
                show: false,
              })),
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
              setSnackbarOptions((prev) => ({
                ...prev,
                show: false,
              })),
            3000
          );
        }
      });
  };

  React.useEffect(getQuestion, [context.token]);

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
        <Stars />
        <section className="ques-container">
          {state.loaded ? (
            <>
              <div className="ques-box">
                <div className="round_bg">
                  <div className="round">R-{state.question.round}</div>
                </div>
                <p className="question">{state.question.text}</p>
                {state.question.media && (
                  <div className="ques-img-wrap">
                    <img
                      src={endpoints.BASE_URL + state.question.media}
                      alt="hint"
                      className="ques-img"
                      onClick={() =>
                        window.open(
                          endpoints.BASE_URL + state.question.media,
                          "_blank"
                        )
                      }
                    />
                  </div>
                )}
                <input
                  className="answer"
                  id="answerInput"
                  type="text"
                  placeholder="type your answer here"
                  onKeyDown={(evt) => {
                    if (evt.key === "Enter") {
                      checkAnswer();
                    }
                  }}
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
              <ColorRing
                visible={true}
                height="135"
                width="135"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#65beda", "#65beda", "#65beda", "#65beda", "#65beda"]}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export default Question;
