// The purpose of this code is to keep Chrome service worker going.


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
self.onmessage = (e) => {};
createOffscreen();


// ------------------------------------------------------------------------------------------------//
// Restarts the local storage every time the browser opens. (except the sound setting)


chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(null, (items) => {  // Passing null means get everything
    const keysToRemove = Object.keys(items).filter( // (items) is an JavaScript object (key: value)
      (key) => key !== "shouldPlaySound"
    );
    chrome.storage.local.remove(keysToRemove);
  });
});


// -------------------------------------------------------------------------------------------------//
// This part returns a dynamic message based on how much time has passed.


const TIME_TO_APPEAR = 1800000; // Every 30 minutes.
let notificationInterval = null;
let playSound = false;


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


// -------------------------------------------------------------------------------------------------//
// Starts or stops the interval timer. When started, the timer runs and sends a notification after it finishes.
// Then, the timer resets and starts again.


function startInterval() {
  // Gets the stored sound setting from Chrome storage.
  // "silent" controls sound: sound ON -> silent = false, sound OFF -> silent = true.


  notificationInterval = setInterval(() => {
    chrome.storage.local.get("shouldPlaySound", (result) => {
      playSound = result.shouldPlaySound === true; // playSound is a global variable declared in this file.

      chrome.notifications.create({
        type: "basic",
        iconUrl: chrome.runtime.getURL("assets/icon128px.png"),
        title: "Stay Productive",
        message: messageTimeSpend(),
        silent: !playSound, // here we put the opposite of playSound because the key is "silent"
      });

      console.log("✅ Notification sent!");
    });
  }, TIME_TO_APPEAR);

  console.log("🔁 Interval started.");
}


function stopInterval() {
  if (notificationInterval !== null) {
    clearInterval(notificationInterval);
    notificationInterval = null;
    console.log("🛑 Interval stopped.");
  }
}


// ----------------------------------------------------------------------------------------------------- //
// Request comes from Home.tsx when function changeText is triggered by pressing on <Button />


chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "create") {
    startInterval();
  } else {
    stopInterval();
  }
});


// ----------------------------------------------------------------------------------------------------- //
