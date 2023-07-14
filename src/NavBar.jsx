import React from 'react'
import './NavBar.css';
import {Link} from 'react-router-dom';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LSTM from './LSTM';
import LSTMHome from './LSTMHome';
export default function NavBar() {
  return (
    <div className='NavBar'>
      
        <div className='Logo'>
            Stock Market Prediction
        </div>
        <div className='Models'>
          <ul>
           <li ><Link to="/"  >Home</Link></li>
            <li ><Link to="/LSTMHome" >LSTM</Link></li>
            <li ><Link to="/randomForest" >Random Forest</Link></li>
            <li ><Link to="/SVM" >SVM</Link></li>
            <li ><Link to="/XGBoost" >XGBoost</Link></li>
            <li ><Link to="/Ensemble" >Ensemble</Link></li>
          </ul>
        </div>

    </div>

  )
}
