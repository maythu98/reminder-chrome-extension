import { removeCounting, startCounting } from "./countDown.js";
import { setIsEyeValue, setIsWalkingValue } from "./storage.js";

export function alarm_create(name = "alarm-walking") {
    chrome.alarms.clear(name);
    let originalName = "walking";
    if (name == "alarm-walking") {
        chrome.storage.sync.get(["walkingIntervalMin", "walkingAlarm"], (result) => {
            chrome.alarms.create(name, {
                delayInMinutes: result.walkingAlarm,
                periodInMinutes: result.walkingIntervalMin,
            });
            
            return startCounting(originalName);
        });
    } else {
        originalName = "eye";
        chrome.storage.sync.get(["eyeIntervalMin", "eyeAlarm"], (result) => {
            chrome.alarms.create(name, {
                delayInMinutes: result.eyeAlarm,
                periodInMinutes: result.eyeIntervalMin,
            });
            return startCounting(originalName);
        });
    }

  }

  export function remove_alarm(name) {
    chrome.alarms.clear(name);
  }


  export function alarm_destroy(name) {
    chrome.alarms.clear(`alarm-${name}`);
    removeCounting(name);
    document.querySelector(`input[name='${name}_checkbox']`).checked = false;
    if (name == "walking") {
        setIsWalkingValue(false);
    }else {
        setIsEyeValue(false);   
    }
  }
  