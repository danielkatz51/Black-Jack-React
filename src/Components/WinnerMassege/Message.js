import React from "react";
import "./Message.css";
function Message(props) {
  return (
    <div className={props.messageActive}>
      <h3>{props.Message}</h3>
    </div>
  );
}
export default Message;
