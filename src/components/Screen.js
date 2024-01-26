/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from "react";
import "../assets/css/screen.css";
// removed textfit

function Screen({ value }) {
  const screenRef = React.useRef(null);
  return (
    <div ref={screenRef} data-testid="screen-id" className="screen">
      {value}
    </div>
  );
}

export default Screen;
