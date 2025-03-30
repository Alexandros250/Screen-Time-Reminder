chrome.alarms.onAlarm.addListener(
    () =>
        chrome.notifications.create(
            {
                type: "basic",
                iconUrl: chrome.runtime.getURL("assets/Hi.png"),
                title: "Stay Productive",
                message: "30 minutes have passed since last notification!",
                silent: true
            },
            () => {}
        ),
)






chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.time) {
            createAlarm();

            sendResponse({ success: true }); 
        } 
    }
);

function createAlarm() {
    chrome.alarms.create(
        "stay_productive",
        {
            delayInMinutes: 1,
            periodInMinutes: 1
        }
    );
}