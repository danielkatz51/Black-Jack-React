import React, { useState, useEffect } from "react";
import "./DealerSide.css";
import Card from "../Card/Card";

function DealerSide(props) {
  const [dealerHand, setdealerHand] = useState([]);
  useEffect(() => {
    setdealerHand(props.dealerHand);
   },[props.dealerHand]);
  return (
    <div className="dealer-container">
      {dealerHand.map((card, index) => {
        return <Card CardName={card} key={index} cardIndex={index}/>;
      })}
    </div>
  );
}

export default DealerSide;
