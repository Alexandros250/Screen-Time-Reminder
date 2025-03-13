import { useState, MouseEvent } from 'react';
// import PropTypes from 'prop-types';

function PopUp() {
    const [showPopUp, setShowPopUp] = useState<string>("");

    function showToastText(event: MouseEvent<HTMLButtonElement>): void {
        setShowPopUp("Toast");
        postMessage(showPopUp);
    }

    function showToastPopUp(): null {
        return null;
    }

    return (
        <div>
            <h1>{showPopUp ? showPopUp : "Hello"}</h1>
            <button onClick={showToastText}>Show Toast</button>
        </div>
    );
}

export default PopUp;