import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import abi from './contractAbis/erc20Abi.json';
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import BuyHistory from "./components/buyHistory/buyHistory";
import Header from './components/header/Header';
import Compensate from './components/compensate/Compensate';

function App() {
  let erc20Instance;

  useEffect(() => {
    const createInstance = () => {
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        erc20Instance = new web3.eth.Contract( abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
      }
    }

    createInstance();
  });
    
  return (
    <BrowserRouter>
      <div>
          <Header />
          <Switch>
            <Route
              path="/"
              component={() => <BuyGet instance={erc20Instance}/>}
              exact
            />
            <Route
              path="/history"
              component={() => <BuyHistory instance={erc20Instance}/>}
            />
            <Route
              path="/compensate"
              component={() => <Compensate instance={erc20Instance}/>}
            />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
