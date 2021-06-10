import React, { useEffect, useState } from "react";
import "./buyGet.css";
import { getShortAddress } from "../../utils/addressUtils";

export default function BuyGet(props) {
  const [ethAmount, setEthAmount] = useState("");
  const [getAmount, setGetAmount] = useState("");
  const [buyEvents, setBuyEvents] = useState([]);

  useEffect(() => {
    const func = async () => {
      props.instance.events.Buy(
        {},
        { fromBlock: 0, to: "latest" },
        (err, event) => {
          if (err) {
            console.log(err);
          } else {
            setBuyEvents((events) => [...events, event]);
          }
        }
      );
    };
    func();
  }, [props.instance]);

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

    const func = async () => {
      const tokenDecimals = await props.instance.methods.decimals().call();
      const getAmountUnits = getAmount * Math.pow(10, tokenDecimals);
      const ethAmountUnits = props.web3.utils.toWei(ethAmount, "ether");

      props.instance.methods
        .buy(getAmountUnits.toString())
        .send({
          from: props.account,
          value: ethAmountUnits,
        })
        .on("receipt", (receipt) => {
          alert(
            `Success!\nTransaction hash ${receipt.transactionHash}\nGas used: ${receipt.gasUsed}`
          );

          setEthAmount("");
          setGetAmount("");
        });
    };
    func();
  };

  return (
    <>
      <section className="col text-center">
        <h2>Buy GET tokens</h2>
      </section>
      <section id="buySection" className="row">
        <section id="buyGetFormSection" className="col text-center">
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
        </section>
        <section className="col text-center">
          <img src="img/buy.png" alt="green" width="600" />
        </section>
      </section>
      <div id="buyHistorySection">
        <h3>Buy history</h3>
        {buyEvents && buyEvents.length > 0 ? (
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
              {buyEvents?.map((e) => (
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
