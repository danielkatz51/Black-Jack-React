import React, { useState, useEffect } from "react";
import "./PlayerSide.css";
import Card from "../Card/Card";
import ScoreCube from "../ScoreCube/ScoreCube";
//Player hand component
function PlayerSide(props) {
  const [PlayerHand, setPlayerHand] = useState([]);//Player card hand "arr".
  //i'm using 'useEffect' here with a dependent to update the Player hand if and card added.
  useEffect(() => {
    setPlayerHand(props.playerHand);
  }, [props.playerHand]);
  return (
    <div className="player-container">
      <ScoreCube>{props.playerSum}</ScoreCube>
      <div>
        {PlayerHand.map((card, index) => {//By using Map function i'm returning the same component for each element in the Player hand Array
          return <Card CardName={card} key={index} />;
        })}
      </div>
    </div>
  );
}

export default PlayerSide;
