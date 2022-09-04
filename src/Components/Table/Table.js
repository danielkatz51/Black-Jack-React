import React, { useState, useEffect } from "react";
import "./Table.css";
import DealerSide from "../DealerSide/DealerSide";
import PlayerSide from "../PlayerSide/PlayerSide";
import StartPage from "../Start-Page/StartPage";
import Message from "../WinnerMassege/Message";
import { BsSuitSpade } from "react-icons/bs";//icon
import { TbHandStop } from "react-icons/tb";//icon
import { HiOutlineRefresh } from "react-icons/hi";//icon
//Game component
function Table() {
  const [Deck, setDeck] = useState([]);//Deck of card var.
  const [Hit, setHit] = useState(true);//this is for checking if the player can draw more cards.
  const [dealerSum, setdealerSum] = useState();//Dealer point sum.
  const [playerSum, setplayerSum] = useState();//Player point sum.
  const [dealerHand, setdealerHand] = useState([]);//Dealer cards Hand.
  const [dealerAceCount, setDealerAceCount] = useState(0);//This for counting how many aces dealer have.
  const [playerHand, setplayerHand] = useState([]);//Player cards Hand.
  const [playerAceCount, setplayerAceCount] = useState(0);//This for counting how many aces Player have.
  const [active, setActive] = useState("Table hidden");//This for changing all page class when starting the game.
  const [messageActive, setMessageActive] = useState("message hidden");//This is for PopUp message class.
  const [message, setMessage] = useState("");//Message var.
  const [showCards, setshowCards] = useState(false);//boolean var to check if Player finished his turn.
  //when starting the first render im building the deck of card and then shuffling.
  useEffect(() => {
    buildDeck();
  }, []);
//Creating the Deck
  function buildDeck() {
    //all posible cards
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
    //all posible shapes
    let types = ["C", "D", "H", "S"];
    var buildDeck = [];
    
    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        buildDeck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
      }
    }
    shuffleDeck(buildDeck);
  }
  //Shffling the Deck
  function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    setDeck(deck);
  }
  //getting the value of the card that each one of the players draw .
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
  //Chacking if the card is an ACE card to update the 'dealerAceCount OR playerAceCount'.
  function checkAce(card) {
    if (card[0] === "A") {
      return 1;
    }
    return 0;
  }
  //starting the game init
  function startGame() {
    setHit(true);
    let arr = [];
    let sum = 0;
    let aces = 0;
    //==========For dealer hand==========
    //pulling two cards from the deck to the dealer hand.
    for (let i = 0; i < 2; i++) {
      if (Deck.length !== 0) {
        let card = Deck.pop();
        sum += getValue(card);
        aces += checkAce(card);
        arr.push(card);
      }
    }
    //Updating the relavent var
    setDealerAceCount(aces);
    setdealerSum(sum);
    setdealerHand(arr);
    arr = [];
    sum = 0;
    aces = 0;
    //============For Player=============
    //pulling two cards from the deck to the Player hand.
    for (let i = 0; i < 2; i++) {
      if (Deck.length !== 0) {
        let card = Deck.pop();
        sum += getValue(card);
        aces += checkAce(card);
        arr.push(card);
      }
    }
    //Updating the relavent var
    setplayerAceCount(aces);
    setplayerSum(sum);
    setplayerHand(arr);
    arr = [];
    sum = 0;
    aces = 0;
  }
  //Hit function if the player wants to draw a card to his hand.
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
    //This is to check if the player sum point not pass the 21,
    //And if so is changing the value by the amount of ACES.
    if (reduceAce(sum, aces) > 21) {
      //A, J, 8 -> 1 + 10 + 8
      setHit(false);
      setMessage("More then 21 - You Lose!");
      setMessageActive("message");
    }
  }
  //changing the sum points by knowing the amount of ACES in the Player OR Dealer Hand.
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
    //initilaizing the game 
    setMessage("");
    setActive("Table");
    setshowCards(false);
    setMessageActive("message hidden");
    // chacking each time if the deck not reached the amount of 20 card,
    //if so its creating a new deck of cards.
    if (Deck.length < 20) {
      buildDeck();
    }
    startGame();
  }
  //Player finished his turn.
  function stay() {
    //changing the HIT var to false so that the player can't draw more card.
    setHit(false);
    //showing dealer all card (Hand)
    setshowCards(true);
    let sum = dealerSum;
    let aces = dealerAceCount;
    let arr = dealerHand;
    //Checking if dealer sum points not reached to 17,
    //if not the dealer will continue to draw card till reach 17 point. 
    while (sum <= 17) {
      let card = Deck.pop();
      sum += getValue(card);
      aces += checkAce(card);
      arr.push(card);
      setDealerAceCount(aces);
      setdealerSum(sum);
      setdealerHand(arr);
    }
    //When the Dealer Reached 17 point passing the value
    //to 'CheckWinner' to check how won this round.
    checkWinner(sum);
  }
  //Checking who won this round
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