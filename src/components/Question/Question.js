import React from "react";
import styles from "./Question.module.css";
import HintButton from "./Hint";
import SubmitButton from "./Submit";
import Round from "./Round";

const Question = () => {
  return (
    <div>
      <div className={styles.ques}>
        <section>
          <div className={styles.ques_box}>
            <Round questionNumber={1} />
            <p>
              This is a sample question. hello there how are you . this is a
              game{" "}
            </p>

            <input
              className={styles.answer}
              type="text"
              placeholder="type your answer  here"
            />

            <div className={styles.action}>
              <HintButton />
              <SubmitButton />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Question;
