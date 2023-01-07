import "./Rules.css";
import RulesModal from "./RulesModal";

const Rules = (props) => {
  return (
    <RulesModal onClose={props.onHideRules}>
      <div className="rules1">
        <div id="modalBox">
          <div className="cross">
            <span
              onClose={props.onHideRules}
              onClick={props.onHideRules}
              class="close-button topright"
            >
              &times;
            </span>
          </div>
          <h2 className="rulesH2">Rules</h2>
          <div className="rulesCont">
            <p>1-Answering each question will award you 10 points</p>
            <p>
              2-Each question's hint will be provided after a specific time displayed in the timer
              {" "}
            </p>
            <p>3-No negative scoring for wrong answers. This means you can try any question for an unlimited number of times</p>
          </div>
        </div>
      </div>
    </RulesModal>
  );
};

export default Rules;
