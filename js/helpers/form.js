import { alarm_destroy } from "./alarm.js";
import { setEyeAlaramMin, setEyeIntervalMin, setWalkingAlaramMin, setWalkingIntervalMin } from "./storage.js";

//---## Global Variable
const MIN_REQUIRED = "Please enter minutes";
const INTERVAL_REQUIRED = "Please enter interval";

export function submit(form) {
  let hourValue = form.elements["hour"].value ?? 0;
  hourValue = hourValue * 60;
  let minValue = form.elements["min"];
  let intervalValue = form.elements["interval"];
  // check validation
  let min = hasValue(minValue, MIN_REQUIRED);
  let interval = hasValue(intervalValue, INTERVAL_REQUIRED);

  // if valid, submit the form

  if (min && interval) {
    minValue = parseInt(minValue.value) + parseInt(hourValue);
    //Set Long Hour Min value
    setAlarmTime(minValue, intervalValue.value, form.elements["btn_submit"]);
  }
}

//-----------Helpers------------------------------
function setAlarmTime(min, interval, input) {
  if (input.value == "btnWalking") {
    setWalkingIntervalMin(parseInt(interval));
    setWalkingAlaramMin(min);
    alarm_destroy("walking");
  } else {
    setEyeIntervalMin(parseInt(interval));
    setEyeAlaramMin(min);
    alarm_destroy("eye");
  }
}

function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }

  return showSuccess(input);
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input);
}

function showMessage(input, message = "", type = true) {
  const msg = input.parentNode.parentNode.querySelector("small");
  msg.innerText = message;

  //update the class type
  input.className = type ? "success" : "danger";

  return type;
}
