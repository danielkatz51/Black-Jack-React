import React, { useState } from "react";
import './StartPage.css';

function StartPage(props) {
    const [active, setActive] = useState("Start-page");
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