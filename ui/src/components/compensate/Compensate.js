import React, { useEffect, useState } from "react";
import "./Compensate.css";
import Web3 from "web3";

export default function Compensate({instance}) {
  const [getAmount, setGetAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  let web3;
  let accounts;
  let erc20Instance = instance;

  const loadData = async () => {
    // if(!erc20Instance) return;
    const gbcBalance = await erc20Instance.methods.balanceOf(accounts[0]).call();
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

  useEffect(() => {
    const checkIfUserLoggedIn = setInterval(async () => {
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        accounts = await web3.eth.getAccounts();
 
        if(accounts[0]){
          setLoggedIn(true);
          console.log(accounts[0]);
          clearInterval(checkIfUserLoggedIn);
          loadData();
        }
      }
    }, 1000);
  }, []);

  const onGetAmountChange = (e) => {
    const getAmount = e.target.value;

    setGetAmount(getAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const concat = (value) => {
    const firstPart = value.slice(0, 5);
    const lastPart = value.slice(value.length-4, value.length);
    return firstPart + '...' + lastPart;
  }

  return (
    <>
      {!loggedIn ? 
        <div className='mt-2 text-center'>
          <span className='not-logged'>Please login using <code>metamask</code> to access the platform.</span>
        </div> : 
        <div>
          <div id="buySection" className="text-center">
        <div className='mb-2 mt-2'>
          <span className='account balance'>Balance: {balance} GBC</span>
        </div>
        <div>
        <span className='account footprint'>Footprint: {balance} GBC</span>
        </div><br />
        <form className="buyForm" onSubmit={handleSubmit}>
          <div className="mb-3 mt-2">
            <label htmlFor="getAmount">GET to pay</label>
            <input
              type="text"
              className="form-control"
              id="getAmount"
              placeholder="0.00"
              onChange={onGetAmountChange}
              value={getAmount}
            />
          </div>
          <button type="submit" className="btn btn-primary form-control mb-3">
            Pay GET
          </button>
        </form>
      </div>
      <div id="buyHistorySection" className="text-center d-flex mt-4" style={{flexDirection: 'column'}}>
        <h3>Compensate history</h3>
        <div className='w-75 align-self-center'>
          {events && events.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Event Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {events?.map((e) => (
                  <tr key={e.id}>
                    <td>{e.event}</td>
                    <td data-toggle="tooltip" 
                      data-placement="top" 
                      title={e.returnValues.from}>{concat(e.returnValues.from)}</td>
                    <td data-toggle="tooltip" 
                      data-placement="top" 
                      title={e.returnValues.to}>{concat(e.returnValues.to)}</td>
                    <td>{e.returnValues.value/(10**18)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No events so far...</p>
          )}
        </div>
      </div>
        </div>
      }
    </>
  );
}