import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import {
  GREEN_ENERGY_CONTRACT_ADDRESS,
  GREEN_ENERGY_TOKEN_ABI,
} from "./contractAbis/greenEnergy";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Compensate from "./components/compensate/Compensate";

function App() {
  const [instance, setInstance] = useState();
  const [web3Instance, setWeb3Instance] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState(0);
  const [footprint, setFootprint] = useState(0);

  useEffect(() => {
    const createInstance = async () => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (accounts) => {
            setAccount(accounts[0]);

            const web3 = new Web3(window.ethereum);
            setWeb3Instance(web3);
            
            window.ethereum.on("accountsChanged", accounts => setAccount(accounts[0] || ''));

            const getInstance = new web3.eth.Contract(
              GREEN_ENERGY_TOKEN_ABI,
              GREEN_ENERGY_CONTRACT_ADDRESS
            );
            setInstance(getInstance);
          })
          .catch(console.error);
      }
    };

    createInstance();
  }, []);

  //subscribing to updates regarding balance and footprint
  useEffect(() => {
    if(instance !== undefined){
      setInterval(() => {
        updateBalances();
      }, 2000);
    }
  }, [instance]);

  const updateBalances = async () => {
    const _balance = await instance.methods.balanceOf(account).call();
    const _footprint = await instance.methods.getFootPrint(account).call();
    
    if(_balance !== balance || _footprint !== footprint){
      setBalance(_balance / (10**18));
      setFootprint(_footprint / (10**18));
    }
  }

  return (
    <BrowserRouter>
      {!instance ? null : <Header instance={instance} _balance={balance} _footprint={footprint}/>}
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
              component={() => (
                <Compensate
                  instance={instance}
                  account={account}
                  web3={web3Instance}
                />
              )}
            />
          </Switch>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
