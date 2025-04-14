// Keeps the service worker going
async function createOffscreen() {
  await chrome.offscreen
    .createDocument({
      url: "offscreen.html",
      reasons: ["BLOBS"],
      justification: "keep service worker running",
    })
    .catch(() => {});
}
chrome.runtime.onStartup.addListener(createOffscreen);
self.onmessage = (e) => {}; // keepAlive
createOffscreen();

// Restarts the local storage every time the browser opens
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.clear();
});

//1800000
const TIME_TO_APPEAR = 60000;
let intervalId = null;
let silent = false;

// Closure -> remembers the value of currentTimeSpend
function sendTimeUsed() {
  let currentTimeSpend = 0;

  return function timeUsed() {
    currentTimeSpend += 30;
    if (currentTimeSpend <= 30) {
      return `Used for ${Math.floor(currentTimeSpend)} min`;
    } else if (currentTimeSpend % 60 === 0) {
      return `Used for ${Math.floor(currentTimeSpend / 60)}h`;
    } else {
      return `Used for ${Math.floor(currentTimeSpend / 60)}h and ${
        currentTimeSpend % 60
      } min`;
    }
  };
}

const messageTimeSpend = sendTimeUsed();

function startInterval() {
  if (intervalId !== null) {
    console.log("Interval already running, not starting again.");
    return;
  }


  chrome.storage.local.get("soundEnabled", (result) => {
    silent = result.soundEnabled === false;
  })
  intervalId = setInterval(() => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: chrome.runtime.getURL("assets/icon128px.png"),
      title: "Stay Productive",
      message: messageTimeSpend(),
      silent: silent,
    });

    console.log("✅ Notification sent!");
  }, TIME_TO_APPEAR);

  console.log("🔁 Interval started.");
}

function stopInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("🛑 Interval stopped / Reseted if sound button pressed.");
  }
}

// Request comes from Text.tsx when function changeText is triggered by pressing on <Button />
chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "create") {
    startInterval();
  } else {
    stopInterval();
  }
  () => {};
});
