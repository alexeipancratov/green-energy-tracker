import React, { useState } from "react";
import "./buyGet.css";

export default function BuyGet(props) {
  const [ethAmount, setEthAmount] = useState("");
  const [getAmount, setGetAmount] = useState("");

  const onEthAmountChange = (e) => {
    const ethAmount = e.target.value;

    setEthAmount(ethAmount);
    setGetAmount(ethAmount);
  };

  const onGetAmountChange = (e) => {
    const getAmount = e.target.value;

    setEthAmount(getAmount);
    setGetAmount(getAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div id="buySection" className="text-center">
        <p>
          Balance: <span>{props.balance} GBC</span>
        </p>
        <form className="buyForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="ethAmount">ETH to spend</label>
            <input
              type="text"
              className="form-control"
              id="ethAmount"
              aria-describedby="emailHelp"
              placeholder="0.00"
              onChange={onEthAmountChange}
              value={ethAmount}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="getAmount">GET to receive</label>
            <input
              type="text"
              className="form-control"
              id="getAmount"
              placeholder="0.00"
              onChange={onGetAmountChange}
              value={getAmount}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Buy GET
          </button>
        </form>
      </div>
      <div id="buyHistorySection">
        <h3>Buy history</h3>
        {props.events && props.events.length > 0 ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Event Type</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {props.events?.map((e) => (
                <tr key={e.id}>
                  <td>{e.event}</td>
                  <td>{e.raw.topics[1]}</td>
                  <td>{e.raw.topics[2]}</td>
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
