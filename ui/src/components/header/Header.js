import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import Web3 from "web3";
import {BiWalletAlt} from 'react-icons/bi';
import {AiOutlineFire} from 'react-icons/ai';

const Header = ({instance, web3}) => {
  const [buttonClass, setButtonClass] = useState("btn btn-success position");
  const [disabled, setDisabled] = useState(false);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [footprint, setFootprint] = useState(0);

  useEffect(() => {
    const func = async () => {
      if (window.ethereum) {
        let web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();

        if (accounts[0]) {
          setAccount(accounts[0]);
          setDisabled(true);
          setButtonClass("btn btn-secondary position");
        }
      }
    };

    func();
  }, []);

  useEffect(() => {
    if (account === '') return;
    const getBalanceAndFootprint = async () => {
      const _balance = await instance.methods.balanceOf(account).call();
      setBalance(_balance / (10**18));
      const _footprint = await instance.methods.getFootPrint(account).call();
      setBalance(_balance / (10**18));
    }

    getBalanceAndFootprint();
  }, [account]);

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
    <nav>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row header">
          <NavLink to="/" className="btn link" exact activeClassName="link-active">
            Buy GET tokens
          </NavLink>
          <NavLink to="/compensate" className="btn link" activeClassName="link-active">
            Compensate Footprint
          </NavLink>
        </div>
        <div className="d-flex flex-row-reverse header">
          <button onClick={connect} className={buttonClass} disabled={disabled}>
            Connect to wallet
          </button>
          <div className='d-flex align-items-center' style={{fontWeight: '700', marginRight: '20px'}}>
            <span className='balances' 
              style={{backgroundColor: '#009879', marginRight: '10px'}}><BiWalletAlt /> Balance: {balance} GET
            </span>
            <span className='balances' 
              style={{backgroundColor: 'tomato'}}><AiOutlineFire /> Footprint: {footprint}
            </span>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
