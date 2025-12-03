import React from 'react';
import './AddBankBanner.css';
import { Link } from 'react-router-dom';

const AddBankBanner = () => {
    return (
        <div className='addBankBanner-container'>
            <div className='addBankBanner-content'>
                <div className='addBankBanner-text'>
                    <h1 className='addBankBanner-title'>
                        Setup your Banking Details
                    </h1>
                    <div className='addBankBanner-description'>
                        Fill up your banking credentials in order to withdraw your money to the bank.
                    </div>
                    <div className='addBankBanner-noCharge'>
                        No Charge Applied
                    </div>
                    <Link
                        to='/profile'
                        className='addBankBanner-button'
                    >
                        Let's Start
                    </Link>
                </div>

                
                <div className='addBankBanner-image-desktop'>
                    <img src='https://img.icons8.com/bubbles/300/000000/bank-building.png' alt="Bank Icon" />
                </div>
            </div>
        </div>
    );
};

export default AddBankBanner;
