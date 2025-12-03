import React from 'react';
import { CiEdit } from "react-icons/ci";
import { Link, useParams } from 'react-router-dom';
import './CampaignUpdate.css';

const CampaignUpdate = () => {
    const { id } = useParams();

    return (
        <div className='grid-container'>
            <div className='section'>
                <div className='content-box green-bg'>
                    <div className='content'>
                        <div className='icon-container'>
                            <img className='icon' src="https://img.icons8.com/bubbles/150/000000/trust.png" alt="trust" />
                        </div>
                        <h1 className='title'>Started work with the collected amount?</h1>
                        <p className='description'>Let the supporters and community know about the progress of your campaign to build trust.</p>
                        <div className='button-container'>
                            <Link to={`/UpdatesCampaign/${id}`} className='action-button'>
                                Post your updates <CiEdit size={15} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'>
                <div className='content-box yellow-bg'>
                    <div className='content'>
                        <div className='icon-container'>
                            <img className='icon' src="https://img.icons8.com/bubbles/150/edit.png" alt="edit" />
                        </div>
                        <h1 className='title'>Need to update campaign details?</h1>
                        <p className='description'>Edit your campaign details by following a few simple steps.</p>
                        <div className='button-container'>
                            <Link to={`/EditCampaign/${id}`} className='action-button'>
                                Edit Campaign <CiEdit size={15} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'>
                <div className='content-box green-bg'>
                    <div className='content'>
                        <div className='icon-container'>
                            <img className='icon' src="https://img.icons8.com/bubbles/150/000000/trust.png" alt="trust" />
                        </div>
                        <h1 className='title'>View Collected Fund</h1>
                        <p className='description'>View the donations you have received from the community.</p>
                        <div className='button-container'>
                            <Link to={`/ViewDonation/${id}`} className='action-button'>
                                View
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignUpdate;

