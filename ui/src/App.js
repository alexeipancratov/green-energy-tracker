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
  // const [balance, setBalance] = useState(0);
  // const [events, setEvents] = useState([]);

  // /*
  //   * This function calls a function tries to login using metamask.
  //   * - If login succeeds, the class for button is changed to make it looks like disables and button is
  //   * made disabled.
  //   * - If login fails, nothing works ahead of it and button remains as it is.
  //   */
  // const connect = () => {
  //   return new Promise(async (resolve, reject) => {
  //     if (window.ethereum) {
  //       const web3 = new Web3(window.ethereum);
  //       let accounts = await web3.eth.getAccounts();
  //       console.log(accounts);
 
  //       if(accounts[0]){
  //         resolve();
  //       }
  //       window.ethereum.enable().then(async (data) => {
  //         const accounts = await web3.eth.getAccounts();
  //         console.log(accounts);
          
  //         web3.eth.getBalance(accounts[0]).then(data => {
  //           console.log(data/(10**18));
  //         });

  //         const erc20Instance = new web3.eth.Contract(
  //           abi,
  //           "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  //         );

  //         const gbcBalance = await erc20Instance.methods.balanceOf(accounts[0]).call();
  //         setBalance(gbcBalance / 1000000000000000000);

  //         await erc20Instance.methods.transfer('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '2000000000000000000').send({from: accounts[0]}).then(console.log).catch(console.error);

  //         console.log("Events");
  //         erc20Instance.events.Transfer(
  //           {},
  //           { fromBlock: 0, to: "latest" },
  //           (err, event) => {
  //             if (err) {
  //               console.log(err);
  //             } else {
  //               console.log(event);
  //               setEvents((events) => [...events, event]);
  //             }
  //           }
  //         );
          
  //         resolve();
  //       }).catch(error => {
  //         console.log(error);
  //         reject();
  //       });
  //     }
  //   });
  // }
    
  return (
    <BrowserRouter>
      <div>
          <Header />
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
              component={() => <Compensate />}
            />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
