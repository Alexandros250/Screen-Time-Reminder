import { useRef, useEffect } from "react"


function Button() {

const buttonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
    if (buttonRef.current) {
        console.log("Button found:", buttonRef.current)
    }
}, []);

    return (
    <div>
        <button id="btn">Click</button>
    </div>
  )
}

export default Button