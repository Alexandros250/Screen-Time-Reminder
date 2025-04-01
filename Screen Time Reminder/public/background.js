// 1800000
const TIME_TO_APPEAR = 300000;

// This function returns a specific message based on how much time the user 
// stayed on the web. (using closure)
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


// This function uses Chrome API to create an alarm that appears for 30 seconds
function createAlarm() {
    chrome.alarms.create(
        "stay_productive",
        {
            periodInMinutes: 0.5
        }
    );
}

// This listens for a event("click") from App.tsx in order to call createAlarm();
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (typeof sendResponse !== "function") {
            console.error("sendResponse is not a function")
        } else {
            console.log(request);
            if (request.time) {
                createAlarm();
                sendResponse({succes: true});
            } else {
                sendResponse({succes: false, message: "Invalid request!"})
            }
        }
    }
);

function startInterval() {
// Finally setInterval is started and every 30 minutes the user receives a notification
setInterval(() => {
    chrome.alarms.onAlarm.addListener(
    () =>
        chrome.notifications.create(
            {
                type: "basic",
                iconUrl: chrome.runtime.getURL("assets/icon128.png"),
                title: "Stay Productive",
                message: messageTimeSpend(),
                silent: false
            },
            () => {}
        ),
        
)
}, TIME_TO_APPEAR)

return true;
}

startInterval();

