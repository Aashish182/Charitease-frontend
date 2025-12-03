
import React, { useState } from 'react';
import './LoggedUserCampaignCard.css';
import { Link } from 'react-router-dom';
import WarningPopup from '../components/WarningPopup';

const LoggedUserCampaignCard = ({ campaign, index, callFunc }) => {
    const [popupVisible, setPopupVisible] = useState(false); 
    const [popupPosition, setPopupPosition] = useState({});

    const handleMouseEnter = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({
            top: rect.top + window.scrollY + 20, 
            left: rect.left + window.scrollX
        });
    };

    return (
        <div className="card-campaign">
            <div className='card-container' key={index}>
                <div className='card-image-container'>
                    <Link to={`/Campaign/${campaign?._id}`}>
                        <img className='campaign-image' src={campaign?.image} alt="" />
                    </Link>
                </div>
                <div className='details-container'>
                    <Link to={`/Campaign/${campaign?._id}`}>
                        <h1 className='title'>{campaign?.title}</h1>
                    </Link>
                    <div className='actions'>
                        <Link to={`/ManageCampaign/${campaign._id}`} className='manage-button'>
                            Manage Campaign
                        </Link>
                        <div
                            onClick={() => setPopupVisible(true)} 
                            onMouseEnter={handleMouseEnter}
                            className='complete-button'>
                            Mark Completed
                        </div>
                        {popupVisible && (
                            <WarningPopup 
                            setPopupVisible={setPopupVisible} 
                            id={campaign?._id} 
                            callFunc={callFunc} 
                            />
                        )}
                    </div>
                    <div className='stats'>
                        <div className='stat-item'>
                            <p className='stat-label'>Raised</p>
                            <h1 className='stat-value'>₹ {campaign?.raisedAmount}</h1>
                        </div>
                        <div className='stat-item'>
                            <p className='stat-label'>Goals</p>
                            <h1 className='stat-value'>₹ {campaign?.amount}</h1>
                        </div>
                        <div className='stat-item'>
                            <p className='stat-label'>Left</p>
                            <h1 className='stat-value'>
                                ₹ {Math.max(0, campaign?.amount - campaign?.raisedAmount)}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoggedUserCampaignCard;

