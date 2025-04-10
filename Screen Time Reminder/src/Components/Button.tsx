import { useRef } from "react";
import "../css/Button.css";

interface ButtonProps {
  functionality: () => void;
}

function Button({ functionality }: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button
        className="main-button"
        ref={buttonRef}
        onClick={functionality}
        id="btn"
      >
        <span>Click</span>
      </button>
    </div>
  );
}

export default Button;
