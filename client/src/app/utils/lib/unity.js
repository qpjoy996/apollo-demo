import { throttle } from "lodash";

const actionNames = [
  "joinGame",
  "prepareGame",
  "inviteFriends",
  "back",
  "setAvatar",
  "showFriends",
  "openExternalUrl",
  "showFloatWeb",
  "showAvatar",
  "setAutoLogin",
  "userLogin",
  "googleAuth",
  "openAvatar",
  "cancelGame",
  "showDialog",
  "showOtherAvatar",
  "openAvatar",
];

// const actList = [
//   {
//     action: 'userLogin',
//     code: 1,
//   },
//   {
//     action: 'setAutoLogin',
//     code: 9,
//   },
//   {
//     action: 'showFloatWeb',
//     code: 11,
//   },
//   {
//     action: 'showAvatar',
//     code: 17,
//   },
//   {
//     action: 'googleAuth',
//     code: 21,
//   },
// ];

export const userAgent =
  navigator.userAgent || navigator.vendor || window.opera;

export function isIOS() {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return true;
  } else {
    return false;
  }
}

export function isAndroid() {
  return /android/i.test(userAgent);
}

export function appendIframeWithURL(url) {
  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", url);
  document.documentElement.appendChild(iframe);
  iframe.parentNode.removeChild(iframe);
  iframe = null;
}

export function sendMessageToUnity(message) {
  if (isIOS()) {
    appendIframeWithURL("inappbrowserbridge://" + message);
  } else if (isAndroid()) {
    console.log(message);
    UnityInAppBrowser.sendMessageFromJS(message);
  }
}

export function sendPing() {
  sendMessageToUnity("ping");
}

class Unity {
  static init() {
    const event = "_zfb_event";
    function throttleEvent() {
      if (window[event]) {
        console.log(`[Davinci info]: initializing Unity`);
        // ReadOnly Object _zfb_event
        // Unity.listenAspect(event, {
        //   listen: window[event],
        //   before: function (action) {
        //     console.log(`[Davinci info]: before ${action}`);
        //   },
        //   after: function (action) {
        //     console.log(`[Davinci info]: after ${action}`);
        //   },
        // });
        Unity.cacheAllUnityFunction(actionNames);
        Unity.emit("appReady", {});
        return true;
      }
      return false;
    }
    if (!throttleEvent()) {
      let times = 0;
      let eventInterval = setInterval(() => {
        times++;
        let rs = throttleEvent();
        if (rs) {
          clearInterval(eventInterval);
        } else if (times > 100) {
          clearInterval(eventInterval);
        }
      }, 100);
    }
  }

  static emit(action, json = {}) {
    const strJSON = JSON.stringify(json);
    let jsonArr = [json];
    let jsonArrJSON = JSON.stringify(jsonArr);
    if (isAndroid() || isIOS()) {
      sendMessageToUnity(`${action}, ${jsonArrJSON}`);
    } else {
      if (window[action] && typeof window[action] === "function") {
        //localStorage.setItem(`_zfb_event_${action}`, window[action])
      }
      if (!window["_zfb_event"]) {
        console.log("ZFBrowser event is not bounded!");
        return;
      }
      if (!window[action]) {
        let actList = Unity.actList(actionNames);
        let nowAct = actList.find((item) => item.action === action);
        if (nowAct) {
          window[action] = function () {
            window["_zfb_event"](
              nowAct.code,
              JSON.stringify(Array.prototype.slice.call(arguments))
            );
          };
        } else {
          let eventNumber = localStorage.getItem(`_zfb_event_${action}`);
          const func =
            eventNumber && !isNaN(Number(eventNumber))
              ? function () {
                  window["_zfb_event"](
                    Number(eventNumber),
                    JSON.stringify(Array.prototype.slice.call(arguments))
                  );
                }
              : undefined;
          if (func) {
            console.log("从缓存调用unity函数", action, strJSON);
            func(strJSON, `${action}, ${jsonArrJSON}`);
          } else {
            console.log(`开始搜索函数${action}`);
            let count = 0;
            let timer = setInterval(() => {
              const hasFunc = window[action];
              count += 1;
              if (hasFunc) {
                hasFunc(strJSON, `${action}, ${jsonArrJSON}`);
                clearInterval(timer);
              } else {
                window["_zfb_event"](0, action);
              }
              if (count > 10) {
                console.log(`找不到函数${action}`);
                clearInterval(timer);
              }
            }, 1000);
          }
          return;
        }
      }
      console.log("调用unity函数", action, window[action], strJSON);
      window[action](strJSON, `${action}, ${jsonArrJSON}`);
    }
  }

  static on(action, cb) {
    window[action] = cb;
  }

  static unListen(action, cb) {
    window[action] = () => {};
  }

  static listenAspect(action, { listen, before, after }) {
    window[action] = listen;
    let native = window[action];
    window[action] = function () {
      before && before(action);
      native.apply(window, arguments);
      after && after(action);
    };
  }

  static actList(funcArr) {
    return funcArr.map((action) => {
      if (typeof window[action] === "function") {
        if (
          String(window[action]) &&
          String(window[action]).indexOf("_zfb_event(") > -1
        ) {
          const actionNumber = String(window[action])
            .split("_zfb_event(")[1]
            .split(",")[0];
          if (!isNaN(Number(actionNumber))) {
            return {
              action,
              code: actionNumber,
            };
            // localStorage.setItem(`_zfb_event_${action}`, actionNumber);
          }
          return { action: "", code: 0 };
        }
        return { action: "", code: 0 };
      }
      return { action: "", code: 0 };
    });
  }

  static cacheAllUnityFunction(funcArr) {
    funcArr.forEach((action) => {
      if (typeof window[action] === "function") {
        if (
          String(window[action]) &&
          String(window[action]).indexOf("_zfb_event(") > -1
        ) {
          const actionNumber = String(window[action])
            .split("_zfb_event(")[1]
            .split(",")[0];
          if (!isNaN(Number(actionNumber))) {
            localStorage.setItem(`_zfb_event_${action}`, actionNumber);
          }
        }
      }
    });
  }

  static cacheAllUnityFunctions(funcArr) {
    setTimeout(() => {
      funcArr.forEach((action) => {
        if (typeof window[action] === "function") {
          if (
            String(window[action]) &&
            String(window[action]).indexOf("_zfb_event(") > -1
          ) {
            const actionNumber = String(window[action])
              .split("_zfb_event(")[1]
              .split(",")[0];
            if (!isNaN(Number(actionNumber))) {
              localStorage.setItem(`_zfb_event_${action}`, actionNumber);
            }
          }
        }
      });
    }, 2000);
  }
}

export default Unity;
