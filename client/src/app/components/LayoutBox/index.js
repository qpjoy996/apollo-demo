import React from "react";
import { withRouter } from "react-router-dom";

const LayoutBox = (props) => {
  return <div className="LayoutBox">{props.children}</div>;
};

export default withRouter(LayoutBox);
