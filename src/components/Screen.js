import React from "react";
import { Textfit } from "react-textfit";
import "../assets/css/screen.css";

const Screen = ({ value }) => {
  return (
    <Textfit data-testid="screen-id" className="screen" mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default Screen;