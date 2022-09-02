import React, { useState, useEffect } from "react";
import "./Table.css";
import DealerSide from "../DealerSide/DealerSide";
import PlayerSide from "../PlayerSide/PlayerSide";
import StartPage from "../Start-Page/StartPage";
import Message from "../WinnerMassege/Message";
import { BsSuitSpade } from "react-icons/bs";
import { TbHandStop } from "react-icons/tb";
import { HiOutlineRefresh } from "react-icons/hi";
function Table() {
  const [Deck, setDeck] = useState([]);
  const [Hit, setHit] = useState(true);
  const [dealerSum, setdealerSum] = useState();
  const [playerSum, setplayerSum] = useState();
  const [dealerHand, setdealerHand] = useState([]);
  const [dealerAceCount, setDealerAceCount] = useState(0);
  const [playerHand, setplayerHand] = useState([]);
  const [playerAceCount, setplayerAceCount] = useState(0);
  const [active, setActive] = useState("Table hidden");
  const [messageActive, setMessageActive] = useState("message hidden");
  const [message, setMessage] = useState("");
  const [showCards, setshowCards] = useState(false);
  useEffect(() => {
    buildDeck();
  }, []);

  function buildDeck() {
    let values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    let types = ["C", "D", "H", "S"];
    var buildDeck = [];

    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        buildDeck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
      }
    }
    shuffleDeck(buildDeck);
  }
  function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    setDeck(deck);
  }
  function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) {
      //A J Q K
      if (value === "A") {
        return 11;
      }
      return 10;
    }
    return parseInt(value);
  }
  function checkAce(card) {
    if (card[0] === "A") {
      return 1;
    }
    return 0;
  }
  function startGame() {
    setHit(true);
    let arr = [];
    let sum = 0;
    let aces = 0;
    //==========For dealer hand==========
    for (let i = 0; i < 2; i++) {
      if (Deck.length !== 0) {
        let card = Deck.pop();
        sum += getValue(card);
        aces += checkAce(card);
        arr.push(card);
      }
    }
    setDealerAceCount(aces);
    setdealerSum(sum);
    setdealerHand(arr);
    arr = [];
    sum = 0;
    aces = 0;
    //============For Player=============
    for (let i = 0; i < 2; i++) {
      if (Deck.length !== 0) {
        let card = Deck.pop();
        sum += getValue(card);
        aces += checkAce(card);
        arr.push(card);
      }
    }
    setplayerAceCount(aces);
    setplayerSum(sum);
    setplayerHand(arr);
    arr = [];
    sum = 0;
    aces = 0;
  }
  function hit() {
    let sum = playerSum;
    let aces = playerAceCount;
    let arr = playerHand;
    if (!Hit) {
      return;
    }
    let card = Deck.pop();
    sum += getValue(card);
    aces += checkAce(card);
    arr.push(card);
    setplayerHand(arr);
    if (reduceAce(sum, aces) > 21) {
      //A, J, 8 -> 1 + 10 + 8
      setHit(false);
      setMessage("More then 21 - You Lose!");
      setMessageActive("message");
    }
  }
  function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10;
      playerAceCount -= 1;
    }
    setplayerSum(playerSum);
    setplayerAceCount(playerAceCount);
    return playerSum;
  }
  function LetsPlay() {
    setMessage("");
    setActive("Table");
    setshowCards(false);
    setMessageActive("message hidden");
    if (Deck.length < 20) {
      buildDeck();
    }
    startGame();
  }
  function stay() {
    setHit(false);
    setshowCards(true);
    let sum = dealerSum;
    let aces = dealerAceCount;
    let arr = dealerHand;
    while (sum <= 17) {
      let card = Deck.pop();
      sum += getValue(card);
      aces += checkAce(card);
      arr.push(card);
      setDealerAceCount(aces);
      setdealerSum(sum);
      setdealerHand(arr);
    }
    checkWinner(sum);
  }
  function checkWinner(DealerSum) {
    let Dsum = DealerSum;
    let Psum = playerSum;
    setMessageActive("message");
    if (Psum > 21) {
      setMessage("Dealer win - You Lose!");
    } else if (Dsum > 21) {
      setMessage("You win!");
    } else if (Psum === Dsum) {
      setMessage("Tie!");
    } else if (Psum > Dsum) {
      setMessage("You Win!");
    } else if (Psum < Dsum) {
      setMessage("Dealer win - You Lose!");
    }
  }
  return (
    <div className="Table-container">
      <StartPage LetsPlay={LetsPlay} />
      <Message Message={message} messageActive={messageActive} />
      <div className={active}>
        <DealerSide
          dealerHand={dealerHand}
          dealerSum={dealerSum}
          showCards={showCards}
        />
        <PlayerSide playerHand={playerHand} playerSum={playerSum} />
        <div className="buttons-box">
          <button onClick={hit} className="Hit">
            <BsSuitSpade />
            <br />
            <span>Hit</span>
          </button>
          <button onClick={stay} className="Hit">
            <TbHandStop />
            <br />
            <span>Stay</span>
          </button>
          <button onClick={LetsPlay} className="Hit">
            <HiOutlineRefresh />
            <br />
            <span>Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;