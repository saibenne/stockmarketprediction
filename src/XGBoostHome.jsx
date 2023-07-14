import React from 'react'
import { useState } from 'react';
import XGBoost from './XGBoost';

export default function XGBoostHome() {
    const [useComp,setComp]=useState(false);
    const handleClick=()=>{
        setComp(true);

    }
  return (
    <div className='ModelHome'>
        
        <div className='hlogo'><h1>XGBoost Model</h1></div>
        {/* <!--<div className='Img'><img src='https://miro.medium.com/max/3384/1*etquzYCBh3v58rcsXjDsyw.png'></img></div> */}
        <button onClick={handleClick}>TrainModel</button>
        {useComp&&<XGBoost/>}
     
    </div>

  )
}
