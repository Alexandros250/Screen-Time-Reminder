import { useEffect, useState } from "react";
import "../css/SwitchButton.css";


function SwitchButton() {
  const [audio, setAudio] = useState<boolean>(true);


  // Load saved setting from chrome.storage when popup opens
  // When the app is first installed default audio is on. After it always checks chrome.storage.local
  useEffect(() => {
    chrome.storage.local.get(["shouldPlaySound"], (result) => {
      if (typeof result.shouldPlaySound === "boolean") {
        setAudio(result.shouldPlaySound);
      } else {
        setAudio(true);
        chrome.storage.local.set({ shouldPlaySound: true });
      }
    });
  }, []); // useEffect() runs only once when popup mounts because [] are empty.


  // After it is initialized in useEffect whenever the switch button is pressed, the value of shouldPlaySound changes
  // in order for background.js to take care of it. And audio changes in order for switch button to change position.
  const changeSoundSettings = () => {
    const newValue = !audio;
    setAudio(newValue);
    chrome.storage.local.set({ shouldPlaySound: newValue });
  };


  return (
    <label
      className="switch-button"
      htmlFor="switch"
      title="Toggle sound"
      aria-label="Toggle sound"
    >
      <div className="switch-outer">
        <input
          id="switch"
          type="checkbox"
          checked={audio} // changes the switch button position
          onChange={changeSoundSettings}
        />
        <div className="sw-button">
          <span className="sw-button-toggle"></span>
          <span className="sw-button-indicator"></span>
        </div>
      </div>
    </label>
  );
}

export default SwitchButton;
