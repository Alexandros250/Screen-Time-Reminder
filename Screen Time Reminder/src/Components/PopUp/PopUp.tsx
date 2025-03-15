import React from 'react';
import { useState, MouseEvent, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import PropTypes from 'prop-types';
import MyImage from '../MyImage/MyImage';

let currentTimeSpend: number = 0;

function PopUp() {
    const [showPopUp, setShowPopUp] = useState<string>("");

    function showToastText(): void {
        setShowPopUp("Toast");
        postMessage(showPopUp);
    }

    // This function will show how much time the user has spent on the website

    // This function return the notification every 5 minutes
//     const timeBetweenNotifications: number = 300000;
//     const notification = () =>  {
//         setInterval( () => {
//             timeSpent();
//             toast(`Used ${currentTimeSpend / 60} min`, {duration: 5000, icon: "👏", position: "top-center", style: {scale: 1.4}});
//         }, timeBetweenNotifications)
// };
    










//     function notifyTest(): void|number { {
//         const timeBetweenNotifications: number = 300000;
//         let currentTimeSpend: number = 0;

//         function notification(): void {
//             setInterval( () => {
//         toast("Used 30 min", {duration: 5000, icon: "👏", position: "top-center", style: {scale: 1.4}});
//     }, timeBetweenNotifications)
// };      
//         if (currentTimeSpend <= 0) {
//             notification();
//             return currentTimeSpend += 300000;
//         }
    
//     }
       

    
    
    //👍This feature works perfectly but for testing I will keep the button version
    // const notify: void = setInterval( () => {
    //     toast("Used 30 min", {duration: 5000, icon: "👏", position: "top-center", style: {scale: 1.4}});
    // }, 300000);

        const notify =  () => {
        toast("Used 30 min", {duration: 5000, icon: <MyImage />, position: "top-center", style: {display: 'flex',scale: 1.4, justifyContent: 'center', alignItems: 'center', gap: '15px'}});
    };
    const timeToAppear: number = 5000;
    const notification = () =>  {
        setInterval( () => {
            currentTimeSpend += 30;
            toast(`Used ${Math.floor(currentTimeSpend)} min`, {duration: 5000, icon: <MyImage />, position: "top-center", style: {display: 'flex',scale: 1.4, justifyContent: 'center', alignItems: 'center', gap: '15px'}});
        }, timeToAppear);
};

    return (
        <div>
            <h1>{showPopUp ? showPopUp : "Hello"}</h1>
            <button onClick={notification}>Show Toast</button>
            <Toaster />
        </div>
    );
};

export default PopUp;