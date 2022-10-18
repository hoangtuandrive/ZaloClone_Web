import React from "react";
import "./Compose.css";
import Button from "@mui/material";

export default function Compose(props) {
  return (
    <div className="compose">
      <div className="left-button"> {props.leftItems} </div>
      <div className="container">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          spellCheck="false"
        />
        <div className="right-button"> {props.rightItems} </div>
      </div>
    </div>
  );
}
