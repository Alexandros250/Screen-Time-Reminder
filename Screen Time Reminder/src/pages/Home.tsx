import { useRef, useState } from "react";
import Button from "../Components/Button";
import DropdownButton from "../Components/DropdownButton";
import "../css/Home.css";

function Home() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState("");

  // This changes the css for the text.
  const colorClass = text === "Stopped" ? "stopped" : "works";


// -------------------------------------------------------------------------------------------------- //
// This part sends messages that background.js listens to, and then updates the text.


  function changeText() {
    if (text === "Stopped") {
      chrome.runtime.sendMessage({ message: "create" });
    } else {
      chrome.runtime.sendMessage({ message: "delete" });
    }

    const newText = text === "Stopped" ? "Works" : "Stopped";
    setText(newText);

    // Update chrome storage
    chrome.storage.local.set({ value: newText === "Stopped" }); // This saves value as a boolean.
  }


// --------------------------------------------------------------------------------------------------- //
// Initially when the browser is oppened, the extension is set by default to stopped.


  chrome.storage.local.get(["value"], (result) => {
    if (typeof result.value === "undefined") {
      setText("Stopped");
    } else {
      setText(result.value ? "Stopped" : "Works"); //after 1st iteration text changes if result === true || false
    }
  });

// ---------------------------------------------------------------------------------------------------- //


  return (
    <div>
      <h1
        ref={textRef}
        className={colorClass}
        aria-label="Notifications Work"
        title="Notifications Work"
      >
        {text}
      </h1>
      <Button functionality={changeText} />
      <DropdownButton />
    </div>
  );
}

export default Home;
