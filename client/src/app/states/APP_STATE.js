let API_URL = process.env.REACT_APP_API_URL || "";
let IS_RELEASE =
  process.env.REACT_APP_RELEASE && /true/.test(process.env.REACT_APP_RELEASE);
let NODE_ENV = process.env.NODE_ENV || "local";
let PUBLIC_URL = process.env.PUBLIC_URL || "";
let SERVER = process.env.REACT_APP_SERVER || "local";
let VERSION = process.env.REACT_APP_VERSION || "0.0.3";
let IS_DEV_ENV = ["local", "dev", "approval", "alpha"].indexOf(SERVER) > -1;

export {
  API_URL,
  IS_RELEASE,
  NODE_ENV,
  PUBLIC_URL,
  SERVER,
  VERSION,
  IS_DEV_ENV,
};
