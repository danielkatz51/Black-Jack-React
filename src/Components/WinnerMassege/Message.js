import React from "react";
import "./Message.css";
//Popup message for who won the round
function Message(props) {
  return (
    <div className={props.messageActive}>
      <h3>{props.Message}</h3>
    </div>
  );
}
export default Message;
