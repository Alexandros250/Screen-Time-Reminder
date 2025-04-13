import "../css/SwitchButton.css";
function SwitchButton() {
  return (
    <>
      <label className="switch-button" htmlFor="switch">
        <div className="switch-outer">
          <input id="switch" type="checkbox" />
          <div className="sw-button">
            <span className="sw-button-toggle"></span>
            <span className="sw-button-indicator"></span>
          </div>
        </div>
      </label>
    </>
  );
}

export default SwitchButton;
