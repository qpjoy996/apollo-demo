import "core-js/stable";
import "unfetch/polyfill";

import React from "react";
import ReactDOM from "react-dom";

// ^3.0 serviceWorker  ^4.0 reportWebVitals
import reportWebVitals from "./reportWebVitals";
import { _inServer } from "@/app/utils";
import App from "@/App";
import userAgent from "@/app/utils/device";
import Unity from "@/app/utils/lib/unity";

if (_inServer(["local", "alpha", "dev", "oversea-test"])) {
  // const VConsole = require('vconsole');
  // new VConsole();
  const eruda = require("eruda");
  console.log(eruda, " - - - - - - this is eruda");
  let el = document.createElement("div");
  document.body.appendChild(el);

  eruda.init({
    container: el,
    tool: ["console", "elements", "network"],
  });
}

if (userAgent.isDesktop()) {
  Unity.init();
} else {
  window.onload = function () {
    Unity.emit("appReady", {});
    Unity.on("commonHeader", (_lilithHeader) => {
      commonHeader(_lilithHeader);
    });
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
