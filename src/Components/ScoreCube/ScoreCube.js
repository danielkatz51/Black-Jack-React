import React from "react";
import "./ScoreCube.css";
//Score component
function ScoreCube(props) {
  return <h1 className="score">{props.children}</h1>;
}

export default ScoreCube;
