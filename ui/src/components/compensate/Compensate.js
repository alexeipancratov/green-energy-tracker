import React, { useState, useEffect } from 'react';
import './Compensate.css';
import Web3 from "web3";

const Compensate = () => {

    const [address, setAddress] = useState(0);
    const [balance, setBalance] = useState(0);
    const web3 = new Web3(window.ethereum);

    useEffect(async () => {  
        let accounts = await web3.eth.getAccounts();
        let balances = await web3.eth.getBalance(accounts[0]);
        setAddress(accounts[0]);
        setBalance(balances / (10**18));
    }, []);

    const pay = () => {

    }

    return(
        <div className='d-flex justify-content-center container'>
            <div style={{width: '70%'}}>
                <h5 style={{fontStyle:'italic', fontWeight: 'bold'}}> 
                    Your public address: <span style={{color: 'tomato'}}>{address}</span><br />
                    Your GET balance: <span style={{color: 'tomato'}}>{balance.toFixed(3)}</span>
                </h5>
                <form onSubmit={e => e.preventDefault()}>
                    <div className='d-flex flex-row justify-content-between' style={{marginTop: '20px'}}>
                        <input type='number' style={{width: '69%', 
                            padding: '5px', 
                            borderRadius: '5px',
                            border: '1px solid grey',
                            WebkitAppearance: 'none'}}
                            placeholder='Enter amount of tokens you want to pay'/>
                        <button style={{width: '29%',
                            padding: '5px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: 'lightgreen',
                            color: 'black'}}
                            onClick={pay}>Pay</button>
                    </div>
                </form>
                {/* Table of records */}
                <div class="container" style={{width: '100%', textAlign: 'center', fontSize: '20px'}}>
                        <div class="row" style={{fontWeight: 'bold', backgroundColor: 'cyan'}}>
                            <div class="col cell">
                                Timestamp
                            </div>
                            <div class="col cell">
                                Amount
                            </div>
                        </div>
                        <div style={{fontWeight: '500'}} className='body'>
                            <div class="row">
                                <div class="col cell">
                                    10:25 PM
                                </div>
                                <div class="col cell">
                                    5
                                </div>
                            </div>
                            <div class="row">
                                <div class="col cell">
                                    10:27 PM
                                </div>
                                <div class="col cell">
                                    10
                                </div>
                            </div>
                            <div class="row">
                                <div class="col cell">
                                    10:31 PM
                                </div>
                                <div class="col cell">
                                    7
                                </div>
                            </div>
                            <div class="row">
                                <div class="col cell">
                                    10:34 PM
                                </div>
                                <div class="col cell">
                                    16
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Compensate;