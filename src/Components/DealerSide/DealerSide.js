import React, { useState, useEffect } from "react";
import "./DealerSide.css";
import Card from "../Card/Card";
import ScoreCube from "../ScoreCube/ScoreCube";
function DealerSide(props) {
  const [dealerHand, setdealerHand] = useState([]); //dealer hand
  useEffect(() => {
    setdealerHand(props.dealerHand);
  }, [props.dealerHand]);
  if (!props.showCards) {
    return (
      <div className="dealer-container">
        {dealerHand.map((card, index) => {
          return <Card CardName={card} key={index} cardIndex={index} />;
        })}
        ;
      </div>
    );
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
