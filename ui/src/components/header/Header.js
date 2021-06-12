import React, { useEffect, useState } from "react";
import "./header.css";
import Web3 from "web3";
import { useHistory } from "react-router-dom";
import {BiWalletAlt} from 'react-icons/bi';
import {AiOutlineFire} from 'react-icons/ai';

const Header = ({instance, web3, _balance, _footprint}) => {
  const [buttonClass, setButtonClass] = useState("btn btn-success position");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
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
    console.log(`Header - ${_balance}`);
    setBalance(_balance);
    setFootprint(_footprint);
  }, [_balance, _footprint]);

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
          <button onClick={() => history.push('/')} 
            className="btn link" >
            Buy GET Token
          </button>
          <button
            onClick={() => history.push('/compensate')}
            className="btn link">
            Compensate Footprint
          </button>
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
