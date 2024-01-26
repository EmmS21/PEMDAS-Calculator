/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import "./App.css";
import React, { useState } from "react";
import Frame from "./components/Frame";
import Screen from "./components/Screen";
import ButtonParent from "./components/ButtonParent";
import Button from "./components/Button";
// import { Switch } from 'antd';

const buttonValues = [
  ["MC", "MR", "MS", "⌫"],
  ["^", "%", "/", "√"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  const [mem, setMem] = useState("");
  const [num, setNum] = useState("");

  const commaClickHandler = (e) => {
    e.preventDefault();
    const check = num[num.length - 1];
    if (check !== ".") {
      updateScreenHandler(e);
    }
  };

  const equalsClickHandler = () => {
    const signMap = {};
    const availSigns = [];
    const possibleSigns = ["*", "+", "-", "/", "√", "^"];
    let vals = num.split(/[*^√+/-]/);
    for (let i = 0; i < num.length; i++) {
      if (possibleSigns.includes(num[i])) {
        availSigns.push(num[i]);
        signMap[num[i]] = signMap[num[i]] ? signMap[num[i]] + 1 : 1;
      }
    }
    let res = 0;
    vals = vals.filter((item) => item !== "");
    while (availSigns.length > 0) {
      if (signMap["^"] > 0) {
        const pos = parseFloat(availSigns.indexOf("^"));
        res = parseFloat(vals[pos]) ** parseFloat(vals[pos + 1]);
        availSigns.splice(pos, 1);
        vals[pos] = res;
        signMap["^"]--;
      } else if (signMap["√"] > 0) {
        const pos = parseFloat(availSigns.indexOf("√"));
        res = Math.sqrt(parseFloat(vals[pos]));
        availSigns.splice(pos, 1);
        vals[pos] = res;
        signMap["√"]--;
      } else if (signMap["*"] > 0) {
        console.log("beginning", availSigns);
        const pos = parseFloat(availSigns.indexOf("*"));
        console.log("pos", pos);
        res = parseFloat(vals[pos] * parseFloat(vals[pos + 1]));
        availSigns.splice(pos, 1);
        vals[pos] = res;
        vals.splice(pos + 1, 1);
        console.log("avail", availSigns);
        signMap["*"]--;
      } else if (signMap["/"] > 0) {
        const pos = parseFloat(availSigns.indexOf("/"));
        res = parseFloat(vals[pos]) / parseFloat(vals[pos + 1]);
        availSigns.splice(pos, 1);
        vals[pos] = res;
        vals.splice(pos + 1, 1);
        signMap["/"]--;
      } else if (signMap["+"] > 0) {
        const pos = parseFloat(availSigns.indexOf("+"));
        res = parseFloat(vals[pos]) + parseFloat(vals[pos + 1]);
        availSigns.splice(pos, 1);
        vals[pos] = res;
        vals.splice(pos + 1, 1);
        signMap["+"]--;
      } else if (signMap["-"] > 0) {
        const pos = parseFloat(availSigns.indexOf("-"));
        res = parseFloat(vals[pos]) - parseFloat(vals[pos + 1]);
        availSigns.splice(pos, 1);
        vals[pos] = res;
        vals.splice(pos + 1, 1);
        signMap["-"]--;
        availSigns.splice(pos, 1);
      }
    }
    console.log(res);
    setNum(res);
  };

  const percentClickHandler = () => {
    let newNum = num ? parseFloat(removeSpaces(num)) : 0;
    setNum(newNum /= 100 ** 1);
  };

  const resetClickHandler = () => {
    setNum("");
  };

  const memoryRecallHandler = () => {
    setNum(mem);
  };

  const backSpaceHandler = () => {
    const currNum = num.slice(0, -1);
    setNum(currNum);
  };

  const memoryStoreHandler = () => {
    setMem(num);
  };

  const updateScreenHandler = (e) => {
    e.preventDefault();
    const check = num[num.length - 1];
    const possibleSigns = ["*", "+", "-", "/", "√"];
    const value = toLocaleString(removeSpaces(e.target.innerHTML));
    if (!possibleSigns.includes(value)) {
      setNum(num + value);
    } else if (value !== check) {
      setNum(num + value);
    }
  };

  const colorChanger = (checked) => {
    if (checked) {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "#454545";
    }
  };
  return (
    <>
      {/* <Switch
        data-testid='switched'
        className='container'
        style={{zIndex: 1}}
        defaultChecked onChange={colorChanger} /> */}
      <Frame>
        <Screen value={num} />
        <ButtonParent>
          {
            buttonValues.flat().map((btn, i) => (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "MC"
                    ? resetClickHandler
                    : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                        ? equalsClickHandler
                        : btn === "."
                          ? commaClickHandler
                          : btn === "MS"
                            ? memoryStoreHandler
                            : btn === "MR"
                              ? memoryRecallHandler
                              : btn === "⌫"
                                ? backSpaceHandler
                                : updateScreenHandler
                }
              />
            ))
          }
        </ButtonParent>
      </Frame>
    </>
  );
}

export default App;
