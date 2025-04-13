import ReturnButton from "../Components/ReturnButton";
import SwitchButton from "../Components/SwitchButton";
import ErrorButton from "../Components/ErrorButton";
import ArrowButtonLeft from "../Components/ArrowButtonLeft";
import ArrowButtonRight from "../Components/ArrowButtonRight";
import TimeBetweenNotifications from "../Components/TimeBetweenNotifications";
function Settings() {


  return (
    <div className="settings-page">
      <div>
        <h2>Settings</h2>
        <div className="minutes-navbar">
          <ArrowButtonLeft />
          <TimeBetweenNotifications />
          <ArrowButtonRight />
        </div> 
        <SwitchButton />
        <ErrorButton /> 
      </div>
      <ReturnButton />
    </div>
  );
}

export default Settings;
