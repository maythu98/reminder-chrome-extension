import { alarm_destroy, remove_alarm } from "./alarm.js";
import { startRestCounting } from "./countDown.js";
import { setIsEyeRest, setIsEyeValue, setIsWalkingRest, setIsWalkingValue } from "./storage.js";

//Start CountDown Resting Hours
export default function afterAlarm(app)
{
    if (app === "walking" || app == "alarm-walking") {
        //Set Walking Rest
        alarm_destroy("walking");
        setIsWalkingRest(true);
        setIsWalkingValue(false);

        // Please Walking We will rest 
        startRestCounting("walking");
    }
    else {
      //Set eye Rest
      alarm_destroy("eye");
      setIsEyeRest(true);
      setIsEyeValue(false);

      // Please Walking We will rest 
      startRestCounting("eye");
    }
}