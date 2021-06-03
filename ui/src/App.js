import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import abi from "./contractAbis/erc20Abi.json";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import BuyHistory from "./components/buyHistory/buyHistory";

function App() {
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const func = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const accounts = await web3.eth.getAccounts();

        const erc20Instance = new web3.eth.Contract(
          abi,
          "0x61922177b4CbFA6A27426e0B62411d9Ba4562EE4"
        );
        const gbcBalance = await erc20Instance.methods
          .balanceOf(accounts[0])
          .call();
        setBalance(gbcBalance / 1000000000000000000);

        console.log("Events");
        erc20Instance.events.Transfer(
          {},
          { fromBlock: 0, to: "latest" },
          (err, event) => {
            if (err) {
              console.log(err);
            } else {
              console.log(event);
              setEvents((events) => [...events, event]);
            }
          }
        );
      }
    };
    func();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div>
            <Link className="nav-link" to="/">
              Buy GET
            </Link>
            <Link className="nav-link" to="/history">
              GET history
            </Link>
          </div>
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
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
