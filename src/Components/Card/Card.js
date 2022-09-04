import React from "react";
import "./Card.css";
//Card component
function Card(props) {
  let img;
  //checking if the is the first card in dealer hand.
  props.cardIndex !== 0
    ? (img = require("../../Crads-images/" + props.CardName + ".png"))
    : (img = require("../../Crads-images/BACK.png"));
  return <img src={img} className="img" alt="card" />;
}

export default Card;
