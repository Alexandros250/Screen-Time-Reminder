chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

let currentTimeSpend = 0;
const timeToAppear = 5000;

setInterval(() => {
    currentTimeSpend += 30;
    let message;
    if (currentTimeSpend <= 59) {
        message = `Used ${Math.floor(currentTimeSpend)} min`;
    } else if (currentTimeSpend % 60 === 0) {
        message = `Used ${Math.floor(currentTimeSpend / 60)}h`;
    } else {
        message = `Used ${Math.floor(currentTimeSpend / 60)}h and ${(currentTimeSpend % 60)} min`;
    }

    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'vite.svg',
        title: 'Screen Time Reminder',
        message: message,
        priority: 2
    });
}, timeToAppear);