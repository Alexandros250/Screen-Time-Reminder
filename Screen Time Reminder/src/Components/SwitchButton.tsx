import "../css/SwitchButton.css";
import { useEffect, useState } from "react";

function SwitchButton() {
  const [audio, setAudio] = useState<boolean>(true); // default value

  // Load saved setting from chrome.storage when popup opens
  useEffect(() => {
    chrome.storage.local.get(["soundEnabled"], (result) => {
      if (typeof result.soundEnabled === "boolean") {
        setAudio(result.soundEnabled);
      } else {
        // first time opening extension, default to true
        setAudio(true);
        chrome.storage.local.set({ soundEnabled: true });
      }
    });
  }, []); // only once when popup mounts

  const changeSoundSettings = () => {
    const newValue = !audio;
    setAudio(newValue);
    chrome.storage.local.set({ soundEnabled: newValue });
    chrome.runtime.sendMessage({ audio: newValue });
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
          checked={audio}
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
