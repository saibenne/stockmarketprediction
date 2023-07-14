import React, { useEffect, useState } from 'react';
import { myAxios } from './Axios.jsx'
import pipic1 from './pipic1.png'
import './LSTM.css'
import { type } from '@testing-library/user-event/dist/type/index.js';
export default function Ensemble() {
 
  const [responseData, setResponseData] = useState(null);
  const [imgData,setImgData]=useState(null);
 useEffect(() => {
  let hasfetched=false;
  const fetchData = async () => {
    try {
      const res = await myAxios.get("http://localhost:8089/runEnsemble");
      setResponseData(res.data);
      console.log(res.data[0]);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
    
  };
  const fetchImg = async () => {
    try {
      const res = await myAxios.get("http://localhost:8089/getGraph",{
        responseType:'arraybuffer',
      });
      const blob=new Blob([res.data],{ type:'image/png'})
      const imgUrl=URL.createObjectURL(blob);
      setImgData(imgUrl);
      console.log(imgUrl)
      
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  
  fetchData();

  fetchImg();
  
  
}, []);

  const displayGraph=()=>{
    if(imgData&&responseData){
      
      return <img src={imgData} alt='Graph'/>
    }
    return <p className='loader'>Loading Graph...</p>
  }
  return(
    <div className='body'>
      {responseData!=null?
      (
        <div>
        <div className='heading'>ErrorMetrics</div>
      <div className='errors'>
      
      <ul>
     <li>{responseData[0]}</li>
      <li>{responseData[1]}</li>
      <li>{responseData[2]}</li>
      <li>{responseData[3]}</li>
    </ul></div>
    <div className='graph'>
    <div className='heading'>Ensemble (Actual vs Prediceted) Graph</div>
    {displayGraph()}
   </div></div>
    ):(
      <p className='loader'>Loading...</p>
    )}
    
   
    </div>
  )
 
}
