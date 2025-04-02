import { useRef, useEffect } from "react"


function Button() {


    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        chrome.runtime.sendMessage({ time: "1" }, function (response) {
            console.log(response)
        });
   };

    useEffect(() => {
        if (buttonRef.current) {
            console.log("Button found:", buttonRef.current)
        }
    }, []);

    return (
    <div>
        <button ref={buttonRef} onClick={handleClick} id="btn">Click</button>
    </div>
  )
}

export default Button