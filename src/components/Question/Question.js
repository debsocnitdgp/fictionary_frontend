import React from "react";
import "./Question.css";
import HintButton from "./Hint";
import endpoints from "../../utils/APIendpoints";
import { useSelector } from "react-redux";
import { useState } from "react";
import HintModal from "./HintModal";
import SnackBar from "./SnackBar";

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
  const token = useSelector((state) => state.token.value);
  console.log(token);
  const getQuestion = () => {
    fetch(endpoints.QUESTION, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setState({
          question: res,
        });
      });
  };

  const checkAnswer = () => {
    const answer = document.getElementById("answerInput");
    fetch(endpoints.ANSWER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ answer: answer.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setSnackbarOptions({ show: true, text: "Correct Answer!!", success: true });
          setTimeout(
            () => setSnackbarOptions({ show: false, text: "Correct Answer!!", success: true }),
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
        answer.value = "";
      });
  };

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
            <p className="question">{state.question.text}</p>

            <input
              className="answer"
              id="answerInput"
              type="text"
              placeholder="type your answer  here"
            />
            <div className="btns">
              <HintButton onClick={() => setHintModalOpen(true)} />
              <div className="submit_bg" onClick={checkAnswer}>
                <button className="submit">SUBMIT</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Question;
