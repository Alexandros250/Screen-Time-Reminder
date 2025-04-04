// import { useRef, useState ,useEffect } from "react"
// import Button from "../Button/Button";

// chrome.storage.local.set({ copac: true })


// function Text() {

//     const textRef = useRef<HTMLHeadingElement>(null);
//     const [text, setText] = useState("");

//     function changeText() {
//       if (text === "Stopped") {
        
//         chrome.runtime.sendMessage({time: "1"}, function (response) {
//         console.log(response)
// })
  
// }
//       setText((prevText) => (prevText === "Stopped" ? "Works" : "Stopped"));
// }

//  useEffect(() => {
//     console.log("useEffect is running!");

//     // Get 'copac' from chrome.storage
//     chrome.storage.local.get(["copac"], (result) => {
//       if (result.copac === true) {
//         result.copac = false
//         chrome.storage.local.set({ copac: false }); // flip it for next time
//         setText("Stopped");
//       } else {
//         setText("Works");
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <h1 ref={textRef}>{text}</h1>
//       <Button functionality={changeText}/>
//     </div>
//   )
// }

// export default Text

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
