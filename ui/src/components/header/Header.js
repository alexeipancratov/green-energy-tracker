import React, { useEffect, useState } from 'react';
import './header.css';

const Header = () => {
    const [buttonClass, setButtonClass] = useState('btn btn-success position');
    const [disabled, setDisabled] = useState(false);
    let web3;

    useEffect(() => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            let accounts = await web3.eth.getAccounts();
            console.log(accounts);
     
            if(accounts[0]){
                setDisabled(true);
                setButtonClass('btn btn-secondary position');
            }
        }
    }, []);

    const connect = () => {
        window.ethereum.enable().then(data => {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
        }).catch(console.error);
        // connect().then(() => {
        //     console.log('Hurray');
        //     setButtonClass('btn btn-secondary position');
        //     setDisabled(true);
        // }).catch(error => {
        //     console.log('Naaay');
        //     setButtonClass('btn btn-success position');
        //     setDisabled(false);
        // });
    }
    return(
        <nav>
            <div className='d-flex flex-row-reverse header'>
            <button onClick={connect} className={buttonClass} disabled={disabled}>
                Connect to wallet
            </button>
            </div>
        </nav>
    );
}

export default Header;