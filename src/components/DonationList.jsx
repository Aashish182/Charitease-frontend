import React from 'react';
import { GiLifeSupport } from 'react-icons/gi'
import { formatDate } from '../utils/dateFormator';
import './DonationList.css'; 

const DonationList = ({ donation,user }) => {
    return (
        <div className="donationlist-container">
            {
                donation && (
                    <>
                        <h1 className='donationlist-title'>Supporters:</h1>
                        {
                            donation.map((item) =>
                                <div key={item._id} className='donationlist-item'>
                                    <div className='donationlist-icon'>
                                        <GiLifeSupport size={25} color='#2ebc62' />
                                    </div>
                                    <div className='donationlist-content'>
                                        <h1 className='donationlist-author'>{item?.cardname}</h1>
                                        <h1 className='donationlist-text'>{item?.amount}</h1>
                                        <h1 className='donationlist-time'>{formatDate(item?.donatedAt)}</h1>
                                    </div>
                                </div>
                            )
                        } 
                    </>
                )
            }
        </div>
    )
}

export default DonationList;
