import './Footer.css';
import {IoIosPaper} from 'react-icons/io';
import {IoCallOutline} from 'react-icons/io5';
import {AiOutlineCopyright} from 'react-icons/ai';

const Footer = () => {
    return(
        <div className='d-flex flex-row justify-content-between footer'>
            <div className='d-flex flex-column'>
                <span className='url' 
                    onClick={() => window.open('https://github.com/alexeipancratov/green-energy-tracker')}>
                        <IoIosPaper /> Read the docs
                </span>
                <span><IoCallOutline /> +1 456-234-9870</span>
            </div>
            <div className='d-flex flex-column justify-content-center'>
                <span><AiOutlineCopyright /> GET Token 2021</span>
            </div>
        </div>
        
    );
}

export default Footer;