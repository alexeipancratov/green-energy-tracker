import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import abi from './contractAbis/erc20Abi.json';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import BuyHistory from "./components/buyHistory/buyHistory";
import Header from './components/header/Header';
import Compensate from './components/compensate/Compensate';

function App() {
  const [instance, setInstance] = useState();

  useEffect(() => {
    const createInstance = () => {
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        let erc20Instance = new web3.eth.Contract(abi, "0xa719E8F91858Aa11D5D746cEFe47b137fd517B7c");
        setInstance(erc20Instance);
      }
    }

    createInstance();
  }, []);
    
  return (
    <BrowserRouter>
      <div>
          <Header />
          {!instance ? null : <Switch>
            <Route
              path="/"
              component={() => <BuyGet instance={instance}/>}
              exact
            />
            <Route
              path="/history"
              component={() => <BuyHistory instance={instance}/>}
            />
            <Route
              path="/compensate"
              component={() => <Compensate instance={instance}/>}
            />
          </Switch>}
      </div>
    </BrowserRouter>
  );
}

export default App;
