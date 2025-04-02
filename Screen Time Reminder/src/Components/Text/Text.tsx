import { useRef, useEffect } from "react"

function Text() {

  const textRef = useRef<HTMLHeadingElement>(null);

    const textElement = textRef.current

  function changeText() {
    
  
    if (!textElement) return; // early exit if ref is not defined
    
    const currentText = textElement.innerHTML;
    
    // Toggle between 'Stopped' and 'Works'
    if (currentText === "") {
        textElement.innerHTML = "Stopped"
    } else if (currentText === "Stopped") {
        textElement.innerHTML = "Works";
    } else {
        textElement.innerHTML = "Stopped";
    }

  }

   useEffect(() => {
    console.log("useEffect is running!")  
    changeText();

    });

  return (
    <div>
      <h1 ref={textRef}></h1>
    </div>
  )
}

export default Text