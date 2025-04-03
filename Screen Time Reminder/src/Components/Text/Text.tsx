import { useRef, useState ,useEffect } from "react"
import Button from "../Button/Button";


function Text() {

    const textRef = useRef<HTMLHeadingElement>(null);
    const [text, setText] = useState("");

    function changeText() {
      
        chrome.runtime.sendMessage({time: "1"}, function (response) {
        console.log(response)
})

    setText((prevText) => (prevText === "Stopped" ? "Works" : "Stopped"));
} 

    useEffect(() => {
        console.log("useEffect is running!")  
        setText("Stopped");
}, []);

  return (
    <div>
      <h1 ref={textRef}>{text}</h1>
      <Button functionality={changeText}/>
    </div>
  )
}

export default Text