import React, { useState } from "react";
import './StartPage.css';
//Starting page 
function StartPage(props) {
    const [active, setActive] = useState("Start-page");//Using useState for the class, Changing it when the 'Start-button' clicked.
    //'Start-button' function for changing the class,
    //And activeting the Starting game function.
    function start(){
        setActive('Start-page hidden');
        props.LetsPlay();
    }
  return (
    <div className={active}>
      <img src={require('../../BackGround-img/blackjack-logo.png')} alt='blackjacklogo'/>
        <button onClick={start} className='Start-button'>Lets Play</button>
    </div>
  )
}

export default StartPage