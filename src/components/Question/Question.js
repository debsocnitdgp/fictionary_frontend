import React from "react";
import "./Question.css";

const Question = () => {
  return (
    <div>
      <div className="ques">
        <section>
          <div className="ques-box">
            <p>This is a sample question. hello there how are you  </p>
            
              <input className="answer" type="text" placeholder="type your answer  here" />
            
           
          </div>
        </section>
      </div>
    </div>
  );
};

export default Question;
