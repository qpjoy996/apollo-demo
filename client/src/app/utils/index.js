import { PHONE_INFO } from "./constants";
import { SERVER } from "@/app/states/APP_STATE";

export const getType = (obj) => {
  let objType = Object.prototype.toString.call(obj);
  if (objType === "[object String]") {
    return "String";
  } else if (objType === "[object Array]") {
    return "Array";
  } else if (objType === "[object Object]") {
    return "Object";
  } else if (objType === "[object Function]") {
    return "Function";
  } else if (objType === "[object Undefined]") {
    return "Undefined";
  } else if (objType === "[object Null]") {
    return "Null";
  }
};

// 判断服务器信息
export const _inServer = (serverList) => {
  if (!SERVER) {
    return false;
  }
  if (
    getType(serverList) === "Array" &&
    serverList.length &&
    serverList.indexOf(SERVER) >= 0
  ) {
    return true;
  } else {
    return false;
  }
};

export const commonHeader = (_lilithLoginObj) => {
  let lilithLoginObj;
  try {
    lilithLoginObj = JSON.parse(_lilithLoginObj);
    // alert(_lilithLoginObj);
    if (lilithLoginObj) {
      let phoneInfo = {
        model: lilithLoginObj.model,
        s_v: lilithLoginObj.s_v,
        device: lilithLoginObj.device,
        app_v: lilithLoginObj.m_a_app_v,
        aid: lilithLoginObj.aid,
        m_a_s_t: lilithLoginObj.m_a_s_t,
      };
      // _isInLocalStorage(phoneInfo);
      localStorage.setItem(PHONE_INFO, JSON.stringify(phoneInfo));
      return lilithLoginObj;
    } else {
      return "";
    }
  } catch (err) {
    console.log(err);
    return "";
  }
};
