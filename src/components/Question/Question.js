import React from "react";
import "./Question.css";
import HintButton from "./Hint";
import SubmitButton from "./Submit";
import Round from "./Round";
import endpoints from "../../utils/APIendpoints";
import { useSelector } from "react-redux";
import { useState } from "react";
import HintModal from "./HintModal";

const Question = () => {
  const [state, setState] = React.useState({
    question: { text: "Loading...", round: 0 },
  });
  const [hintModalOpen, setHintModalOpen] = useState(false);
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
          console.log("Correct answer!!");
          getQuestion();
        } else {
          console.log("Wrong answer");
        }
        answer.value = "";
      });
  };

  React.useEffect(getQuestion, [token]);

  return (
    <div>
      <HintModal open={hintModalOpen} onClose={() => setHintModalOpen(false)} />
      <div className="ques">
        <section>
          <div className="ques-box">
          <div className="round_bg">
              <div className="round">R-{state.question.round}</div>
            </div>
            <p className="question">
              {state.question.text}
            </p>

            <input
              className="answer"
              type="text"
              placeholder="type your answer  here"
            />
            <div className="btns">
              
            <HintButton onClick={() => setHintModalOpen(true)} />
              <div className="submit_bg">
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
