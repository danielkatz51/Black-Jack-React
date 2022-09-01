import React, {useState} from 'react';
import './PlayerSide.css';
import Card from "../Card/Card";

function PlayerSide() {
    const [PlayerHand, setPlayerHand] = useState(["K-C","J-H"]);
    return (
        <div>
          {PlayerHand.map((card, index) => {
            return <Card CardName={card} key={index} />;
          })}
        </div>
      );
}

export default PlayerSide