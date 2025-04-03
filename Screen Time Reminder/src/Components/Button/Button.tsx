import { useRef, useEffect } from "react"

interface ButtonProps {
    functionality: () => void;
}

function Button({functionality}: ButtonProps) {

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            console.log("Button found:", buttonRef.current)
        }
    }, []);

    return (
    <div>
        <button ref={buttonRef} onClick={functionality} id="btn">Click</button>
    </div>
  )
}

export default Button