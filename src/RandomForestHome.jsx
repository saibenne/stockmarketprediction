import React from 'react'
import './ModelHome.css';
import LSTM from './LSTM';
import RandomForest from './RandomForest';
import { useState } from 'react';
export default function RandomForestHome() {
    const [useComp,setComp]=useState(false);
    const handleClick=()=>{
        setComp(true);

    }
  return (
    <div className='ModelHome'>
        
        <div className='hlogo'><h1>RandomForest Regressor</h1></div>
        {/* <div className='Img'><img src='https://www.researchgate.net/profile/Victor_Rodriguez-Galiano/publication/303835073/figure/download/fig3/AS:377949833449472@1467121670301/The-flowchart-of-random-forest-RF-for-regression-adapted-from-Rodriguez-Galiano-et.png'></img></div> */}
        <button onClick={handleClick}>TrainModel</button>
        {useComp&&<RandomForest/>}
     
    </div>

  )
}
