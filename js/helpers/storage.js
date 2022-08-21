  //---------------toggle value----------------------------------
  export function setIsWalkingValue(isWalking = true) {
    chrome.storage.sync.set({ isWalking });
  }

  export function setIsEyeValue(isEye = true) {
    chrome.storage.sync.set({ isEye });
  }


  //----------------setIsWalkingRestTime------------------
  export function setIsWalkingRest(isWalkingRest = true) {
    chrome.storage.sync.set({ isWalkingRest });
  }

  export function setIsEyeRest(isEyeRest = true) {
    chrome.storage.sync.set({ isEyeRest });
  }

  //----------------setRestTimeValue------------------
  export function setWalkingRestValue(walkingRestValue = true) {
    chrome.storage.sync.set({ walkingRestValue });
  }

  export function setEyeRestValue(eyeRestValue = true) {
    chrome.storage.sync.set({ eyeRestValue });
  }

  //
  export function setWalkingInterval(walkingInterval) {
    chrome.storage.sync.set({ walkingInterval });
  }

  export function setEyeInterval(eyeInterval) {
    chrome.storage.sync.set({ eyeInterval });
  }
  

  //--------------Interval Min Value-------------------------
  export function setWalkingIntervalMin(walkingIntervalMin = 15) {
    chrome.storage.sync.set({ walkingIntervalMin });
  }

  export function setEyeIntervalMin(eyeIntervalMin = 15) {
    chrome.storage.sync.set({ eyeIntervalMin });
  }


  //-----------------Alarm Min Value---------------------------
  export function setWalkingAlaramMin(walkingAlarm = 15) {
    chrome.storage.sync.set({ walkingAlarm });
    chrome.storage.sync.get("walkingIntervalMin", ({ walkingIntervalMin }) => {
      setWalkingHtmlValue(walkingAlarm, walkingIntervalMin);
    });
  }

  export function setEyeAlaramMin(eyeAlarm = 15) {
    chrome.storage.sync.set({ eyeAlarm });
    chrome.storage.sync.get("eyeIntervalMin", ({ eyeIntervalMin }) => {
      setEyeHtmlValue(eyeAlarm, eyeIntervalMin);
    });
  }



  //-----------------helpers Html---------------------------------------
  export function setWalkingHtmlValue(value, interval) {
    document.getElementById("walking_hour").value = parseInt(value / 60);
    document.getElementById("walking_minutes").value = parseInt(value % 60);
    document
      .querySelectorAll(".walking-hours")
      .forEach((element) => (element.innerHTML = value));
    
    document.getElementById("walking_interval").value = interval;
  }

  export function setEyeHtmlValue(value, interval) {
    document.getElementById("eye_hour").value = parseInt(value / 60);
    document.getElementById("eye_minutes").value = parseInt(value % 60);
    document
      .querySelectorAll(".eye-hours")
      .forEach((element) => (element.innerHTML = value));
    
    document.getElementById("eye_interval").value = interval;
  }


