const ALARM_WALKING_TITLE = "Let Start Walking!";
const ALARM_WALKING_MESSAGE =
  "Please Start Walking For Your Long Term Health. Let's create a healthy day.";
const ALARM_EYE_TITLE = "Rest Your Eye!";
const ALARM_EYE_MESSAGE =
  "Please rest your eye. Our eye is precious. This is only place where you can see beatiful things.!";

const ALARM_BACK_TITLE = "Let get back to work!";
const ALARM_BACK_TITLE_MESSAGE = "You did great. Lets start work."

chrome.alarms.onAlarm.addListener(function (alarm) {
  let title = ALARM_BACK_TITLE;
  let msg = ALARM_BACK_TITLE_MESSAGE;
  let img = "working.png";

  if (alarm["name"] == "alarm-walking" || alarm["name"] == "alarm-eye") {
    title =
    alarm["name"] == "alarm-walking" ? ALARM_WALKING_TITLE : ALARM_EYE_TITLE;
    msg =
      alarm["name"] == "alarm-walking"
        ? ALARM_WALKING_MESSAGE
        : ALARM_EYE_MESSAGE;

    img = alarm["name"] == "alarm-walking" ? "walking.png" : "eyes.png";
  }
  

  chrome.notifications.create(alarm["name"], {
    type: "basic",
    iconUrl: `../images/${img}`,
    title: title,
    message: msg,
    buttons: [{ title: "OK" }],
    priority: 1,
    silent: false,
  }, (notificationId) => {
    alarm_destroy(notificationId);
  });
});


//------------------------Receiver-------------------------------------
chrome.notifications.onButtonClicked.addListener(function(notificationId, buyerId) {
  if (notificationId == "alarm-walking" || notificationId == "alarm-eye") {
    alarmCreate(notificationId);

    chrome.runtime.sendMessage({
      msg: notificationId
    });
  }
})

function alarmCreate(name = "walking") {
  chrome.storage.sync.get(["walkingIntervalMin", "eyeIntervalMin"], (result) => {
      if (name == "alarm-walking") {
        const isWalkingRest = true;
        chrome.storage.sync.set({ isWalkingRest });
        chrome.alarms.create('alarm-walking-interval', {
          delayInMinutes: result.walkingIntervalMin,
        });
      }
      else {
        const isEyeRest = true;
        chrome.storage.sync.set({ isEyeRest });
        chrome.alarms.create('alarm-eye-interval', {
          delayInMinutes: result.eyeIntervalMin,
        });
      }
  });
}


function alarm_destroy(name) {
  chrome.alarms.clear(name);

  switch (name) {
    case "alarm-walking":
      const isWalking = false;
      chrome.storage.sync.set({ isWalking });
      break;

    case "alarm-eye":
      const isEye = false;
      chrome.storage.sync.set({ isEye });
      break;

    case "alarm-walking-interval":
      const isWalkingRest = false;
      chrome.storage.sync.set({ isWalkingRest });
      break;

    case "alarm-eye-interval":
      const isEyeRest = false;
      chrome.storage.sync.set({ isEyeRest });
      break;
  }
}