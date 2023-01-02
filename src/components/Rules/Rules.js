import "./Rules.css";
import RulesModal from "./RulesModal";

const Rules = (props) => {
  return (
    <RulesModal onClose={props.onHideRules}>
      <div className="rules1">
        <div id="modalBox">
          <h2 className="rulesH2">Rules</h2>
          <div className="rulesCont">
            <p>1-Answering each quedtion will award you 10 points</p>
            <p>2-Hint will Be available as show in the timer</p>
            <p>3-No negative scoring for wrong answers</p>
          </div>
        </div>
      </div>
    </RulesModal>
  );
};

export default Rules;
