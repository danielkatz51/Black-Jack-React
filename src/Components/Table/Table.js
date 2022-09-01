import React, {useState,useEffect} from "react";
import "./Table.css";
import DealerSide from "../DealerSide/DealerSide";
import PlayerSide from "../PlayerSide/PlayerSide";
function Table(props) {
    const [Deck, setDeck] = useState([]);
    const [dealerSum , setdealerSum ] = useState();
    const [playerSum, setplayerSum] = useState();
    const [dealerHand, setdealerHand] = useState([]);
    const [playerHand, setplayerHand] = useState(["2-C","5-H","J-S"]);

   useEffect(() => {
    buildDeck();
    console.log(Deck);
   },[]);

    function buildDeck() {
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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
    
        if (isNaN(value)) { //A J Q K
            if (value == "A") {
                return 11;
            }
            return 10;
        }
        return parseInt(value);
    }
    function checkAce(card) {
        if (card[0] == "A") {
            return 1;
        }
        return 0;
    }
    function startGame(){
        let arr = [];
        for (let i = 0; i < 2; i++) {
            console.log(Deck)
            if(Deck.length !== 0){
                let card = Deck.pop();
                arr.push(card);
            }
            //setdealerSum(getValue(card));
            //yourAceCount += checkAce(card);
        }
        setdealerHand(arr);
        console.log(arr);
    }
    function test(){
        startGame();
        console.log(Deck);
    }
  return (
    <div>
      <div className="Table-container">
        <DealerSide dealerHand={dealerHand}/>
        {/* <PlayerSide/> */}
        <button onClick={test}>test</button>
      </div>
    </div>
  );
}








export default Table;

//Credit for Background img !!Must!!
//Image by <a href="https://www.freepik.com/free-photo/casino-chips-dice-green-table_2914552.htm#query=casino%20table%20background&position=15&from_view=keyword">Freepik</a>