import React, { useState, useEffect } from "react";
import "./PlayerSide.css";
import Card from "../Card/Card";
import ScoreCube from "../ScoreCube/ScoreCube";

function PlayerSide(props) {
  const [PlayerHand, setPlayerHand] = useState([]);
  useEffect(() => {
    setPlayerHand(props.playerHand);
  }, [props.playerHand]);
  return (
    <div className="player-container">
      <ScoreCube>{props.playerSum}</ScoreCube>
      <div>
        {PlayerHand.map((card, index) => {
          return <Card CardName={card} key={index} />;
        })}
      </div>
    </div>
  );
}

export default PlayerSide;
