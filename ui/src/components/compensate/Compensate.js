import React, { useEffect, useState } from "react";
import "./Compensate.css";

export default function Compensate() {
  const [getAmount, setGetAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState([]);
  let web3;

  const loadData = async () => {
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
        let accounts = await web3.eth.getAccounts();
 
        if(accounts[0]){
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

  return (
    <>
      <div id="buySection" className="text-center">
        <p>
          Balance: <span>{balance} GBC</span>
        </p>
        <form className="buyForm" onSubmit={handleSubmit}>
          <div className="mb-3">
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
          <button type="submit" className="btn btn-primary mb-3">
            Pay GET
          </button>
        </form>
      </div>
      <div id="buyHistorySection" className="text-center">
        <h3>Compensate history</h3>
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
                  <td>{e.returnValues.from}</td>
                  <td>{e.returnValues.to}</td>
                  <td>{e.returnValues.value/(10**18)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events so far...</p>
        )}
      </div>
    </>
  );
}