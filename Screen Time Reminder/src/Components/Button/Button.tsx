import { useRef } from "react"
import styles from "./Button.module.css"

interface ButtonProps {
    functionality: () => void;
}

function Button({functionality}: ButtonProps) {

    const buttonRef = useRef<HTMLButtonElement>(null);


    return (
    <div>
        <button className={styles["button__button"]} ref={buttonRef} onClick={functionality} id="btn">Click</button>
    </div>
  )
}

export default Button