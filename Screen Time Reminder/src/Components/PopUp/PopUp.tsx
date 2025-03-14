import React from 'react';
import { useState, MouseEvent } from 'react';
import { Toaster, toast } from 'sonner';
import PropTypes from 'prop-types';


function PopUp() {
    const [showPopUp, setShowPopUp] = useState<string>("");

    function showToastText(event: MouseEvent<HTMLButtonElement>): void {
        console.log(event);
        setShowPopUp("Toast");
        postMessage(showPopUp);
    }
    
    const notify = () => {
        toast("Used 30 min", {duration: 5000, icon: "👏", position: "top-center", style: {scale: 1.4}});
    }

    return (
        <div>
            <h1>{showPopUp ? showPopUp : "Hello"}</h1>
            <button onClick={notify}>Show Toast</button>
            <Toaster />
        </div>
    );
}

export default PopUp;