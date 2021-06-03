import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import abi from './contractAbis/erc20Abi.json';

function App() {
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const func = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
  
        const accounts = await web3.eth.getAccounts();

        const erc20Instance = new web3.eth.Contract(abi, '0x61922177b4CbFA6A27426e0B62411d9Ba4562EE4');
        const gbcBalance = await erc20Instance.methods.balanceOf(accounts[0]).call();
        setBalance(gbcBalance / 1000000000000000000);

        console.log('Events');
        erc20Instance.events.Transfer({}, {fromBlock: 0, to: 'latest'}, (err, event) => {
          if (err) {
            console.log(err);
          } else {
            console.log(event);
            setEvents(events => [...events, event]);
          }
        });
      }
    };
    func();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Balance: <span>{balance} GBC</span>
        </p>
        <table>
          <thead>
            <tr>
              <th>Event Type</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id}>
                <td>{e.event}</td>
                <td>{e.raw.topics[1]}</td>
                <td>{e.raw.topics[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
