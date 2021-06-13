import React, { useEffect, useState } from "react";
import { getShortAddress } from "../../utils/addressUtils";
import "./Compensate.css";

export default function Compensate({instance, account}) {
  const [getAmount, setGetAmount] = useState("");
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      instance.events.Compensate(
        {},
        { fromBlock: 0, to: "latest" },
        (err, event) => {
          if (err) {
            console.log(err);
          } else {
            console.log(event);
            // Filter get only current company related events
            let company = event.filter(e => e.returnValues.to === account);
            setEvent((events) => [...events, company]);
          }
        }
      );
    }

    loadData();
  }, [account, instance]);

  const onGetAmountChange = (e) => {
    const getAmount = e.target.value;

    setGetAmount(getAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (getAmount === 0 || getAmount === '') {
      alert('Fields cannot be empty or 0');
      return;
    }

    const tokenDecimals = await instance.methods.decimals().call();
    const getAmountUnits = getAmount * Math.pow(10, tokenDecimals);
    
    instance.methods.compensate(getAmountUnits)
      .then(receipt => {
        alert(
          `Success!\nTransaction hash ${receipt.transactionHash}\nGas used: ${receipt.gasUsed}`
        );
      }).catch(err => console.error(err));
  };

  return (
    <>
      <section className="col text-center">
        <h2>Compensate footprint</h2>
      </section>
      <section id="buySection" className="row">
        <section id="buyGetFormSection" className="col text-center">
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
              <label htmlFor="getAmount" className='mt-3'>Footprint to be compensated</label>
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
              Pay GET
            </button>
          </form>
        </section>
        <section className="col text-center">
          <img src="img/compensate.png" alt="green" width="250" height="300"/>
        </section>
      </section>
      <div id="buyHistorySection">
        <h3>Compensate history</h3>
        {event && event.length > 0 ? (
          <table className="history-table table table-hover">
            <thead>
              <tr>
                <th>Receiver</th>
                <th>Footprint at time of purchase</th>
                <th>GET Amount (units)</th>
                <th>GET Amount</th>
              </tr>
            </thead>
            <tbody>
              {event?.map((e) => (
                <tr key={e.id}>
                  <td>{getShortAddress(e.returnValues.to)}</td>
                  <td>{e.returnValues.footPrint}</td>
                  <td>{e.returnValues.amount}</td>
                  <td>{`${e.returnValues.amount / Math.pow(10, 18)} GET`}</td>
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