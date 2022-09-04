import React, { useState, useEffect } from "react";
import "./DealerSide.css";
import Card from "../Card/Card";
import ScoreCube from "../ScoreCube/ScoreCube";
//Dealer side component
function DealerSide(props) {
  const [dealerHand, setdealerHand] = useState([]); //dealer card hand "arr"
  //i'm using 'useEffect' here with a dependent to update the dealer hand if and card  added.
  useEffect(() => {
    setdealerHand(props.dealerHand);
  }, [props.dealerHand]);
  //I'm checking if Player finished his turn and then i'm showing all the dealer's cards.
  if (!props.showCards) {
    //'props.showCards' boolean var,
    //if 'props.showCards' = false hide first card and score
    return (
      <div className="dealer-container">
        {dealerHand.map((card, index) => {//By using Map function i'm returning the same component for each element in the Dealer hand Array
          return <Card CardName={card} key={index} cardIndex={index} />;
        })}
        ;
      </div>
    );
    //if 'props.showCards' = true show first card and score
  } else {
    return (
      <div className="dealer-container">
        {dealerHand.map((card, index) => {
          return <Card CardName={card} key={index} />;
        })}
        <ScoreCube>{props.dealerSum}</ScoreCube>
      </div>
    );
  }
}

export default DealerSide;
