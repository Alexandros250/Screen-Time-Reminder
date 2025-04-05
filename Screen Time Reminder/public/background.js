//1800000
const TIME_TO_APPEAR = 60000;
let intervalId = null;

// Closure -> remembers the value of currentTimeSpend
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

// Request comes from Text.tsx when function changeText is triggered by pressing on <Button />
chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "create") {
    startInterval();
  } else {
    stopInterval();
  }
});

