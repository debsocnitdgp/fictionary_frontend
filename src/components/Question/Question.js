import React, { useState } from "react";
import styles from "./Question.module.css";
import HintButton from "./Hint";
import SubmitButton from "./Submit";
import Round from "./Round";
import endpoints from "../../utils/APIendpoints";
import { useSelector } from "react-redux";
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
      <div className={styles.ques}>
        <section>
          <div className={styles.ques_box}>
            <Round questionNumber={state.question.round} />
            <p>{state.question.text}</p>

            <input
              className={styles.answer}
              type="text"
              placeholder="type your answer  here"
              id="answerInput"
            />

            <div className={styles.action}>
              <HintButton onClick={() => setHintModalOpen(true)} />
              <SubmitButton onClick={checkAnswer} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Question;
