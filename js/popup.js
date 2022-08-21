import afterAlarm from "./helpers/afterAlarm.js";
import { alarm_create, alarm_destroy } from "./helpers/alarm.js";
import { showCounting, showRestCount, startCounting, startIntervalCounting } from "./helpers/countDown.js";
import "./helpers/hide-show.js";
import { actionBtnHideShow } from "./helpers/hide-show.js";
import { setEyeAlaramMin, setEyeHtmlValue, setEyeIntervalMin, setIsEyeValue, setIsWalkingValue, setWalkingAlaramMin, setWalkingHtmlValue, setWalkingIntervalMin } from "./helpers/storage.js";


//---------------------------------Handle Alarm On Off------------------------------------
  document
  .querySelector("input[name='walking_checkbox']")
  .addEventListener("change", async (event) => {
    event.preventDefault();    
    setIsWalkingValue(event.target.checked);
    if (event.target.checked) {
      alarm_create("alarm-walking");
    } else {
      alarm_destroy("walking");
    }
  });


  document
  .querySelector("input[name='eye_checkbox']")
  .addEventListener("change", async (event) => {
    event.preventDefault();    
    setIsEyeValue(event.target.checked);
    if (event.target.checked) {
      alarm_create("alarm-eye");
    } else {
      alarm_destroy("eye");
    }
  });


/** ----------------------Handle List TimeBoxes on page load--------------------------- */
chrome.storage.sync.get(
  ["walkingAlarm", "eyeAlarm", "walkingIntervalMin", "eyeIntervalMin", "isWalking", "isEye", "isWalkingRest", "isEyeRest"],
  (result) => {

    //Waling Alaram
    if (!result.walkingAlarm) {
      setWalkingAlaramMin(20);
      setWalkingIntervalMin(15);  
    } else {
      setWalkingHtmlValue(result.walkingAlarm, result.walkingIntervalMin);
    }

    //Eye Alarm
    if (!result.eyeAlarm) {
      setEyeAlaramMin(20);
      setEyeIntervalMin(15);
    } else {
      setEyeHtmlValue(result.eyeAlarm, result.eyeIntervalMin);
    }

    //Is walking
    if (result.isWalking) {
      document.querySelector("input[name='walking_checkbox']").checked = true;
      showCounting("walking");
    }

    //Is eye
    if (result.isEye) {
      document.querySelector("input[name='eye_checkbox']").checked = true;
      showCounting('eye');
    }

    //------------Rest--------------------------------
    if (result.isWalkingRest) {
      startIntervalCounting('walking-interval');
      actionBtnHideShow("walking", 'hide');
    }else {
      actionBtnHideShow("walking", 'show');
    }

    if (result.isEyeRest) {
      startIntervalCounting('eye-interval');
      actionBtnHideShow("eye", 'hide');
    }else {
      actionBtnHideShow("eye", 'show');
    }
  }
);


// //------------------------Receiver-------------------------------------
chrome.runtime.onMessage.addListener(function (request) {
  afterAlarm(request.msg);
}); 

