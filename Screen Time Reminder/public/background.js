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
  chrome.storage.local.get(null, (items) => { // Passing null means get everything
    const keysToRemove = Object.keys(items).filter( //(items) is an JavaScript object (key: value)
      (key) => key !== "shouldPlaySound"
    );
    chrome.storage.local.remove(keysToRemove);
  });
});


// -------------------------------------------------------------------------------------------------//
// This part returns a dynamic message based on how much time has passed.

// 1800000
const TIME_TO_APPEAR = 30000;
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
// Starts/Stops setInterval. This starts the timer and when it has passed, a notification is sent,
// after that the timmer starts again.


function startInterval() {
  if (notificationInterval !== null) {
    console.log("Interval already running, not starting again.");
    return;
  }


  notificationInterval = setInterval(() => {

    // This gets the local value stored inside Chrome storage.
    // The logic is a little bit unintuitive becase the key for notification.create is silent
    // So for the sound to be on --> silent === false , if you want sound off --> silent === true
    // If result.shouldPlaySound is false, the statement will be false because: false === true --> returns false
    // Otherwise true === true --> returns true
    chrome.storage.local.get("shouldPlaySound", (result) => {
      playSound = result.shouldPlaySound === true; // playSound is a global variable declared in this file.


    chrome.notifications.create({
      type: "basic",
      iconUrl: chrome.runtime.getURL("assets/icon128px.png"),
      title: "Stay Productive",
      message: messageTimeSpend(),
      silent: !playSound, // here we put the oposite  of playSound because the key is silent
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
  () => {};
});


// ----------------------------------------------------------------------------------------------------- //