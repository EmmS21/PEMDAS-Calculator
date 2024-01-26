/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import "../assets/css/frame.css";

function Frame({ children }) {
  return <div className="frame">{children}</div>;
}

export default Frame;
