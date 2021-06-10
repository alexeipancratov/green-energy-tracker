import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import {
  GREEN_ENERGY_CONTRACT_ADDRESS,
  GREEN_ENERGY_TOKEN_ABI,
} from "./contractAbis/greenEnergy";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
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

        const getInstance = new web3.eth.Contract(
          GREEN_ENERGY_TOKEN_ABI,
          GREEN_ENERGY_CONTRACT_ADDRESS
        );
        setInstance(getInstance);
      }
    };

    createInstance();
  }, []);

  return (
    <BrowserRouter>
      {!instance ? null : <Header instance={instance}/>}
      <div className="container">
        {!instance ? null : (
          <Switch>
            <Route
              path="/"
              component={() => (
                <BuyGet
                  instance={instance}
                  web3={web3Instance}
                  account={account}
                />
              )}
              exact
            />
            <Route
              path="/compensate"
              component={() => <Compensate instance={instance} account={account}/>}
            />
          </Switch>
        )}
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
