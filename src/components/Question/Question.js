import React from "react";
import "./Question.css";

const Question = () => {
  return (
    <div>
      <div className="ques">
        <section>
          <div className="ques-box">
            <div className="round_bg">
              <div className="round">R-1</div>
            </div>
            <p className="question">
              This is a sample question.This is a sample question. hello This is
              a sample question. hello This is a sample question. hello hello
              there how are you. this is a game This is a sample question. hello
              there how are you . this is a game This is a sample question.
              hello there how are you. this is a game This is a sample question.
              hello there how are you . this is a game{" "}
            </p>
            <input
              className="answer"
              type="text"
              placeholder="type your answer  here"
            />
            <div className="btns">
              <div className="hint_bg">
                <button className="hint">HINT</button>
              </div>
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
