import afterAlarm from "./afterAlarm.js";
import { setEyeRestValue, setIsEyeRest, setIsWalkingRest, setWalkingRestValue } from "./storage.js";


export default class CountDown {
    constructor(expiredTime, onRender, app, complete = null) {
      this.onRender = onRender;
      this.app = app;
      this.setExpiredDate(expiredTime);
      this.onComplete = complete;
      this.intervalId = null;
    }
  
    setExpiredDate(expiredTime) {
      const currentTime = new Date().getTime();
  
      //Calculate the remaining Time
      this.timeRemaining = expiredTime - currentTime;  
      this.timeRemaining <= 0 ? this.complete() : this.start();
    }
  
    complete() {
        if (typeof this.onComplete == "function") {
          this.onComplete(this.app);
        }
    }
  
    getTime() {
      return {
        app: this.app,
        minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
        seconds: Math.floor(this.timeRemaining / 1000) % 60,
      };
    }
  
    update() {
      if (typeof this.onRender == "function") {
        this.onRender(this.getTime());
      }
    }
    
    start() {
      //Update the countdown
      this.update();
  
      //setup a timer
      const intervalId = setInterval(() => {
        //update the timer
        this.timeRemaining -= 1000;
  
        if (this.timeRemaining < 0) {
          //clear this interval
          this.complete();
          clearInterval(intervalId);
        } else {
          this.update();
        }
      }, 1000);
      
      const name = `${this.app}Interval`;
      chrome.storage.sync.set({ [name] : intervalId });

    }

    remove() {
      clearInterval(this.intervalId);
    }
  }


  export function removeCounting(appId)
  {
    //remove interval
    if (appId == "walking") {
      chrome.storage.sync.get("walkingInterval", ({ walkingInterval }) => {
        clearInterval(walkingInterval);
        document.querySelector(`.${appId}-control-minutes`).innerHTML = ``;
      });
    }else {
      chrome.storage.sync.get("eyeInterval", ({ eyeInterval }) => {
        clearInterval(eyeInterval);
        document.querySelector(`.${appId}-control-minutes`).innerHTML = ``;
      });
    }
  }


  export function showCounting(appId)
  {
    //Removie Counting
    // removeCounting(appId);

    //start
    startCounting(appId);
  }

  export function showRestCount(appId)
  {
    if (appId == 'walking') {
      chrome.storage.sync.get("walkingRestValue", ({ walkingRestValue }) => {
        return new CountDown(walkingRestValue, renderWalkingRest, appId, restComplete);
      });
    }else {
      chrome.storage.sync.get("eyeRestValue", ({ eyeRestValue }) => {
        return new CountDown(eyeRestValue, renderEyeRest, appId, restComplete);
      });
    }
  }

  const renderDOM = (time) => {
    if (time) {
      document.querySelector(`.${time.app}-control-minutes`).innerHTML = `
        <div> ${format(time.minutes)} : ${format(
        time.seconds
      )} sec. </div>
      `;
    }
  };

  const workComplete = (app) => {
    afterAlarm(app);
  }

  export function startCounting(appId) {
    const name = `alarm-${appId}`;
    chrome.alarms.get(name).then((result) => {
        return new CountDown(result.scheduledTime, renderDOM, appId);
    });
  }

  export function startIntervalCounting(appId) {
    const name = `alarm-${appId}`;
    let appName = appId == "walking-interval" ? "walking" : "eye";

    chrome.alarms.get(name).then((result) => {
        return new CountDown(result.scheduledTime, renderWalkingRest, appName);
    });
  }



  export function startRestCounting(appName)
  {
    if (appName == "walking") {
      chrome.storage.sync.get("walkingIntervalMin", ({ walkingIntervalMin }) => {
        let date = new Date();
        date.setMinutes(date.getMinutes() + parseInt(walkingIntervalMin));
        setWalkingRestValue(date.getTime());
        return new CountDown(date.getTime(), renderWalkingRest, appName, restComplete);
      });
    }else {
      chrome.storage.sync.get("eyeIntervalMin", ({ eyeIntervalMin }) => {
        let date = new Date();
        date.setMinutes(date.getMinutes() + parseInt(eyeIntervalMin));
        setEyeRestValue(date.getTime());
        return new CountDown(date.getTime(), renderEyeRest, appName, restComplete);
      });
    }
  }

  const renderEyeRest = (time) => {
    if (time) {
      document.querySelector(`.${time.app}-control-minutes`).innerHTML = `
        <div> Please rest within :  ${format(time.minutes)} : ${format(
        time.seconds
      )} sec. </div>
      `;
    }
  }


  const renderWalkingRest = (time) => {
    if (time) {
      document.querySelector(`.${time.app}-control-minutes`).innerHTML = `
        <div> Please ${time.app == "walking" ? "walking" : "rest"} within :  ${format(time.minutes)} : ${format(
        time.seconds
      )} sec. </div>
      `;
    }
  }

  const restComplete = (app) => {
    document.querySelector(`.${app}-control-minutes`).innerHTML = ``;
    if (app == "walking") {
      setIsWalkingRest(false);
    }else {
      setIsEyeRest(false);
    }
  }



  const format = (t) => {
    return t < 10 ? "0" + t : t;
  };

  