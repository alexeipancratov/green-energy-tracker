import React, { useState } from 'react';
import './header.css';

const Header = ({connect}) => {
    const [disabled, setDisabled] = useState(false);
    const [buttonClass, setButtonClass] = useState('button not-connected');

    /*
    * This function calls a function from parent class who tries to login using metamask.
    * - If login succedds, the class for button is changed to make it looks like disables and button is
    * made disabled.
    * - If login fails, nothing works ahead of it and button remains as it is.
    */
    const callConnect = () => {
        connect().then(() => {
            console.log('Hurray');
            setDisabled(true);
            setButtonClass('button connected');
        }).catch(error => {
            console.log('Naaay');
            setDisabled(false);
            setButtonClass('button not-connected');
        });
    }
    return(
        <nav>
            <div className='d-flex flex-row-reverse header'>
                <button className={buttonClass} disabled={disabled} onClick={callConnect}>Connect to wallet</button>
            </div>
        </nav>
    );
}

export default Header;