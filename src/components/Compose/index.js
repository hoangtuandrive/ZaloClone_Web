import React from "react";
import "./Compose.css";

export default function Compose(props) {
  return (
    <div className="compose">
      <div className="button"> {props.rightItems} </div>{" "}
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
      />
    </div>
  );
}
