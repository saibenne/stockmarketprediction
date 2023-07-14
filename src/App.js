import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.jsx'
import LSTM from './LSTM'
import XGBoostHome from './XGBoostHome';
import SVMHome from './SVMHome';
import LSTMHome from './LSTMHome';
import Home from './Home';
import Ensemble from './Ensemble';
import RandomForestHome from './RandomForestHome';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/LSTMHome' Component={LSTMHome}/>
        <Route path='/RandomForest' Component={RandomForestHome}/>
        <Route path='/SVM' Component={SVMHome}/>
        <Route path='/XGBoost' Component={XGBoostHome}/>
        <Route path='/Ensemble' Component={Ensemble}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
