import React from 'react'
import { useState } from 'react';
import SVM from './SVM';

export default function SVMHome() {
    const [useComp,setComp]=useState(false);
    const handleClick=()=>{
        setComp(true);

    }
  return (
    <div className='ModelHome'>
        
        <div className='hlogo'><h1>Support Vector Machine</h1></div>
        {/* <div className='Img'><img src='https://i.pinimg.com/originals/3f/ef/e0/3fefe07f0655166eee2cd6725eabc0c4.png'></img></div> */}
        <button onClick={handleClick}>TrainModel</button>
        {useComp&&<SVM/>}
     
    </div>

  )
}
