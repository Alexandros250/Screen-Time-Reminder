import ReturnButton from "../Components/ReturnButton";
import SwitchButton from "../Components/SwitchButton";
import ErrorButton from "../Components/ErrorButton";

function Settings() {
  return (
    <div className="settings-page">
      <div>
        <h2 className="settings-text">Settings</h2>
        <SwitchButton />
        <ErrorButton />
      </div>
      <ReturnButton />
    </div>
  );
}

export default Settings;
