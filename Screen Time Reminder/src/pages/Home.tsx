import { useRef, useState} from "react";
import Button from "../Components/Button";
import "../css/Home.css";
import DropdownButton from "../Components/DropdownButton";

function Home() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState("");

  const colorClass = text === "Stopped" ? "stopped" : "works";

  function changeText() {
    if (text === "Stopped") {
      chrome.runtime.sendMessage({ message: "create" });
    } else {
      chrome.runtime.sendMessage({ message: "delete" });
    }

    const newText = text === "Stopped" ? "Works" : "Stopped";
    setText(newText);

    // Update chrome storage
    chrome.storage.local.set({ value: newText === "Stopped" });
  }
  
  
    chrome.storage.local.get(["value"], (result) => {
      if (typeof result.value === "undefined") {
        setText("Stopped");
      } else {
        setText(result.value ? "Stopped" : "Works"); //after 1st iteration changes if result === true or false
      }
    });

  return (
    <div>
      <h1 ref={textRef} className={colorClass}>
        {text}
      </h1>
      <Button functionality={changeText} />
      <DropdownButton />
    </div>
  );
}

export default Home;
