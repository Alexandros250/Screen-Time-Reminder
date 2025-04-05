// // 1800000
// const TIME_TO_APPEAR = 60000;
// let response = true;

// // This function returns a specific message based on how much time the user 
// // stayed on the web. (using closure)
// function sendTimeUsed() {
//     let currentTimeSpend = 0; 

//     return function timeUsed() {
//         currentTimeSpend += 30;
//         if (currentTimeSpend <= 30) {
//             return `Used ${Math.floor(currentTimeSpend)} min`;
//         } else if (currentTimeSpend % 60 === 0) {
//             return `Used ${Math.floor(currentTimeSpend / 60)}h`;
//         } else {
//             return `Used ${Math.floor(currentTimeSpend / 60)}h and ${currentTimeSpend % 60} min`;
//         }
//     };
// }

// const messageTimeSpend = sendTimeUsed();


// // This function uses Chrome API to create an alarm that appears for 30 seconds
// function createAlarm() {
//     chrome.alarms.create(
//         "stay_productive",
//         {
//             delayInMinutes: 0.2
//         }
//     )
// }

// // This listens for a event("click") from App.tsx in order to call createAlarm();
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (typeof sendResponse !== "function") {
//             console.error("sendResponse is not a function")
//         } else {
//             console.log(request);
//             if (request.time === "1") {
//                 response = true
//                 createAlarm();
//                 sendResponse({succes: true});
//             } else {
//                 response = false
//                 sendResponse({succes: false, message: "Notifications stopped!"})
//             }
//         }
//     }
// );

// function startInterval() {
// // Finally setInterval is started and every 30 minutes the user receives a notification
// chrome.alarms.onAlarm.addListener(
// setInterval(() => {
//     if (response === true) {
//         () =>
//             chrome.notifications.create(
//                 {
//                     type: "basic",
//                     iconUrl: chrome.runtime.getURL("assets/icon128.png"),
//                     title: "Stay Productive",
//                     message: messageTimeSpend(),
//                     silent: true
//                 },
//                 () => {}
//             )
//     } else {
//         chrome.alarms.clear("stay_productive")
//         clearInterval();
//     }
// }, TIME_TO_APPEAR)

// )
// return true;
// }
// startInterval();

//1800000
const TIME_TO_APPEAR = 60000;
let intervalId = null;
let response = false; // Start in a stopped state

function sendTimeUsed() {
  let currentTimeSpend = 0;

  return function timeUsed() {
    currentTimeSpend += 30;
    if (currentTimeSpend <= 30) {
      return `Used ${Math.floor(currentTimeSpend)} min`;
    } else if (currentTimeSpend % 60 === 0) {
      return `Used ${Math.floor(currentTimeSpend / 60)}h`;
    } else {
      return `Used ${Math.floor(currentTimeSpend / 60)}h and ${currentTimeSpend % 60} min`;
    }
  };
}

const messageTimeSpend = sendTimeUsed();

function createAlarm() {
  chrome.alarms.create("stay_productive", { delayInMinutes: 0.2 });
  console.log("Alarm created!");
}

function startInterval() {
  if (intervalId !== null) {
    console.log("Interval already running, not starting again.");
    return;
  }

  intervalId = setInterval(() => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: chrome.runtime.getURL("assets/icon128.png"),
      title: "Stay Productive",
      message: messageTimeSpend(),
      silent: true,
    });

    console.log("✅ Notification sent!");
  }, TIME_TO_APPEAR);

  console.log("🔁 Interval started.");
}

function stopInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("🛑 Interval stopped.");
  }

  chrome.alarms.clear("stay_productive", (wasCleared) => {
    console.log(wasCleared ? "⏰ Alarm cleared." : "No alarm to clear.");
  });
}

// Handle messages from popup or frontend
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.time === "1") {
    response = true;
    createAlarm();
    startInterval();
    sendResponse({ success: true, message: "Notifications started!" });
  } else {
    response = false;
    stopInterval();
    sendResponse({ success: false, message: "Notifications stopped!" });
  }
});

