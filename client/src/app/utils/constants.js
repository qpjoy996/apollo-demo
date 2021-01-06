import { VERSION } from "@/app/states/APP_STATE";

export const AUTH_TOKEN = "auth-token";
export const DEVICE_ID = "device-id";
export const GOOGLE_TOKEN = "google-token";
export const LILITH_TOKEN = "lilith-token";
export const PHONE_INFO = "phone-info";

// notch adaptation
export const NOTCH_LEFT = "NOTCH_LEFT";
export const NOTCH_TOP = "NOTCH_TOP";
export const NOTCH_RIGHT = "NOTCH_RIGHT";
export const NOTCH_BOTTOM = "NOTCH_BOTTOM";
export const NOTCH_ORIENTATION = "NOTCH_ORIENTATION";

// recommend gameID
export const AD_GAMEID = "AD_GAMEID";

// cache
export const SCHEMA_INFORMATION = {
  key: "apollo-schema-version",
  version: VERSION,
};

// verification code
export const EMAIL_CODE = "EMAIL_CODE";
export const PHONE_CODE = "PHONE_CODE";
export const SMS_CODE = "SMS_CODE";
// -email
export const REGISTER_EMAIL = "REGISTER_EMAIL";
// export const REGISTER_SMS = 'REGISTER_SMS'
export const REGISTER_PHONE = "REGISTER_PHONE";
export const REGISTER_PASSWORD = "REGISTER_PASSWORD";

// search url
export const LOGIN_LOCATION_SEARCH = "LOGIN_LOCATION_SEARCH";
export const QS_STRING = "QS_STRING";
export const PLATFORM = "PLATFORM";
export const MODE = "MODE";

// user
export const ACCOUNT = "ACCOUNT";
export const PASSWORD = "PASSWORD";

export const GENDER = "GENDER";
export const IS_KEEP_LOGIN = "IS_KEEP_LOGIN";
export const NICKNAME = "NICKNAME";
export const USER_ID = "USER_ID";

// play game status
export const GAME_LOADING = "GAME_LOADING";
export const GAME_STARTED = "GAME_STARTED";
export const GAME_ERROR = "GAME_ERROR";

// team status
export const TEAM_INIT = 0;
export const TEAM_GAME_CREATING = 1;
export const TEAM_GAME_PLAYING = 2;

// mart action
export const TYPES_GETASSETS = "TYPES_GETASSETS";
export const TYPES_GET_RECOMMEND_LIST = "TYPES_GET_RECOMMEND_LIST";

// martResult aciton
export const TYPES_GET_FILTERDATA = "TYPES_GET_FILTERDATA";
export const TYPES_RESRT_GETASSETS = "TYPES_RESRT_GETASSETS";
export const TYPES_RESRT_FILTER = "TYPES_RESRT_FILTER";
export const TYPES_GETASSETS_MAX = "TYPES_GETASSETS_MAX";

// disk action
export const TYPES_DISK_GETLIST = "TYPES_DISK_GETLIST";
export const TYPE_DISK_GET_NEXT_FOLDER = "TYPE_DISK_GET_NEXT_FOLDER";
