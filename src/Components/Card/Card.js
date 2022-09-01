import React from 'react';
import './Card.css';

function Card(props) {
    let img = require('../../Crads-images/'+props.CardName+'.png');
    if(props.cardIndex === 0){
        img =require('../../Crads-images/BACK.png')
    }
  return (
    <>
        <img src={img}  alt='card'/>
    </>
  )
}

export default Card