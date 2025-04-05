import { useRef, useState, useEffect } from "react";
import Button from "../Button/Button";

function Text() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState("");

  function changeText() {
    if (text === "Stopped") {
      chrome.runtime.sendMessage({ time: "1" }, function (response) {
        console.log(response);
      });
    } else {
      chrome.runtime.sendMessage({time: "2"}, function (response) {
        console.log(response);
      })
    }

    const newText = text === "Stopped" ? "Works" : "Stopped";
    setText(newText);

    // Update chrome storage accordingly
    chrome.storage.local.set({ copac: newText === "Stopped" });
  }

  useEffect(() => {
    console.log("useEffect is running!");

    // Only set copac initially if it's undefined
    chrome.storage.local.get(["copac"], (result) => {
      if (typeof result.copac === "undefined") {
        chrome.storage.local.set({ copac: true });
        setText("Stopped");
      } else {
        setText(result.copac ? "Stopped" : "Works");
      }
    });
  }, []);

  return (
    <div>
      <h1 ref={textRef}>{text}</h1>
      <Button functionality={changeText} />
    </div>
  );
}

export default Text;
