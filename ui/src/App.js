import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import abi from './contractAbis/erc20Abi.json';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import Header from './components/header/Header';
import Compensate from './components/compensate/Compensate';

function App() {
  const [instance, setInstance] = useState();
  const [web3Instance, setWeb3Instance] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    const createInstance = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3Instance(web3);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const erc20Instance = new web3.eth.Contract(abi, "0x07a457d878BF363E0Bb5aa0B096092f941e19962");
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
              component={() => <BuyGet instance={instance} web3={web3Instance} account={account}/>}
              exact
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
