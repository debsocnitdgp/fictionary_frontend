import React from "react";
import styles from "./Question.module.css";
import HintButton from "./Hint";
import SubmitButton from "./Submit";
import Round from "./Round";

const Question = () => {
  const [state, setState] = React.useState({
    question: { text: "Loading...", round: 0 },
  });
  const getQuestion = () => {
    fetch("/api/question/", {
      headers: {
        Authorization:
          "Token 71a92e5637f176c4c3e9d50f10973bdac9c0e02cc8709fb1165145ead894d21c",
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
    fetch("/api/answer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Token 71a92e5637f176c4c3e9d50f10973bdac9c0e02cc8709fb1165145ead894d21c",
      },
      body: JSON.stringify({ answer: answer.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          console.log("Correct answer!!")
          getQuestion()
        } else {
          console.log("Wrong answer")
        }
        answer.value = ""
      });
  };

  React.useEffect(getQuestion, [false]);

  return (
    <div>
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
              <HintButton />
              <SubmitButton onClick={checkAnswer} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Question;
