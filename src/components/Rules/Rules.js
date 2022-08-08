import "./Rules.css";
import RulesModal from "./RulesModal";

const Rules = (props) => {
  return (
    <RulesModal onClose={props.onHideRules}>
      <div className="rules1">
        <div id="modalBox">
          <h2>Rules</h2>
          <div>
            <p>1-Rule 1</p>
            <p>2-Rule is rule</p>
          </div>
        </div>
      </div>
    </RulesModal>
  );
};

export default Rules;
