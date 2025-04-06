import { useRef } from "react"
import "./Button.css"

interface ButtonProps {
    functionality: () => void;
}

function Button({functionality}: ButtonProps) {

    const buttonRef = useRef<HTMLButtonElement>(null);


    return (
    <div>
        <button ref={buttonRef} onClick={functionality} id="btn">Click</button>
    </div>
  )
}

export default Button