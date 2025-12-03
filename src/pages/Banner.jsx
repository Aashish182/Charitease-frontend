import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
import Bannerimg from '../asset/images/banner.avif';

const Banner = () => {
    return (
        <div className='banner-container'>
            <div className='banner-wrapper'>
                <div className='banner-content'>
                    <h1 className='banner-title'>Need Funds to Pay For a Medical Emergency or Social Cause?</h1>
                    <p className='banner-text'>Collab's 0% Platform fees ensures maximum funds for you</p>
                    <div className='banner-button-wrapper'>
                        <Link to='/CreateCampaign' className='banner-button'>
                            Start Fundraising
                        </Link>
                    </div>
                </div>
                <div className='banner-image-wrapper'>
                    <div className='banner-image-container'>
                        <img className='banner-image' src={Bannerimg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
