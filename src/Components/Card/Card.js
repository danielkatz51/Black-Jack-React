import React from "react";
import "./Card.css";

function Card(props) {
  let img;
  props.cardIndex !== 0
    ? (img = require("../../Crads-images/" + props.CardName + ".png"))
    : (img = require("../../Crads-images/BACK.png"));
  return <img src={img} className="img" alt="card" />;
}

export default Card;
