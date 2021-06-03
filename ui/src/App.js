import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import abi from "./contractAbis/erc20Abi.json";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import BuyHistory from "./components/buyHistory/buyHistory";
import Header from './components/header/Header';
import Compensate from './components/compensate/Compensate';

function App() {
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState([]);

  /*
    * This function calls a function tries to login using metamask.
    * - If login succeeds, the class for button is changed to make it looks like disables and button is
    * made disabled.
    * - If login fails, nothing works ahead of it and button remains as it is.
    */
  const connect = () => {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        console.log(accounts);
 
        if(accounts[0]){
          resolve();
        }
        window.ethereum.enable().then(async (data) => {
          // const accounts = await web3.eth.getAccounts();
          // console.log(accounts);
          
          // web3.eth.getBalance(accounts[0]).then(data => {
          //   console.log(data/(10**18));
          // });

          // const erc20Instance = new web3.eth.Contract(
          //   abi,
          //   "0xa719E8F91858Aa11D5D746cEFe47b137fd517B7c"
          // );

          // const gbcBalance = await erc20Instance.methods.balanceOf(accounts[0]).call();
          // setBalance(gbcBalance / 1000000000000000000);

          // console.log("Events");
          // erc20Instance.events.Transfer(
          //   {},
          //   { fromBlock: 0, to: "latest" },
          //   (err, event) => {
          //     if (err) {
          //       console.log(err);
          //     } else {
          //       console.log(event);
          //       setEvents((events) => [...events, event]);
          //     }
          //   }
          // );
          resolve();
        }).catch(error => {
          console.log(error);
          reject();
        });
      }
    });
  }
    
  return (
    <BrowserRouter>
      <div>
          <Header connect={connect}/>
          <Switch>
            <Route
              path="/"
              component={() => <BuyGet balance={balance} />}
              exact
            />
            <Route
              path="/history"
              component={() => <BuyHistory events={events} />}
            />
            <Route
              path="/compensate"
              component={() => <Compensate/>}
            />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
