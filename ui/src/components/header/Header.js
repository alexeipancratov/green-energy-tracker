import React, { useEffect, useState } from "react";
import "./header.css";
import Web3 from "web3";
import { useHistory } from "react-router-dom";

const Header = ({instance, web3, account}) => {
  const [buttonClass, setButtonClass] = useState("btn btn-success position");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const func = async () => {
      if (window.ethereum) {
        let web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();

        if (accounts[0]) {
          setDisabled(true);
          setButtonClass("btn btn-secondary position");
        }
      }
    };

    func();
  }, []);

  const connect = () => {
    window.ethereum
      .enable()
      .then(async (data) => {
        setDisabled(true);
        setButtonClass("btn btn-secondary position");
      })
      .catch(console.error);
  };

  return (
    <nav style={{ backgroundColor: "wheat" }}>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row header">
          <button onClick={() => history.push("/")} className="btn link">
            Buy
          </button>
          <button
            onClick={() => history.push("/compensate")}
            className="btn link"
            style={{ marginLeft: "10px" }}
          >
            Compensate
          </button>
        </div>
        <div className='d-flex align-items-center'>
          <span>Balance: 10 GET</span>
          <span style={{marginLeft: '20px'}}>Footprint: 5</span>
        </div>
        <div className="d-flex flex-row-reverse header">
          <button onClick={connect} className={buttonClass} disabled={disabled}>
            Connect to wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
