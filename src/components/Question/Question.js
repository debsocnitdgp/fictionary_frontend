import React from "react";
import "./Question.css";

const Question = () => {
  return (
    <div>
      <div className="ques">
        <section>
          <div className="ques-box">
            <div className="round1">
              R-1
            </div>
            <p>This is a sample question. hello there how are you . this is a game </p>

            <input
              className="answer"
              type="text"
              placeholder="type your answer  here"
            />

            <button className="submit">submit</button>
            <button className="hint" >hint</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Question;
