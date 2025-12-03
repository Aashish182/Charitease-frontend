import React, { useState } from 'react';
import Footer from '../components/Footer';
import screenshot1 from '../asset/images/createaccount.png';
import screenshot2 from '../asset/images/createcampaign1.png';
import screenshot3 from '../asset/image.png';
import './Works.css';

const Works = () => {
    const [toggleFullImageView, setToggleFullImageView] = useState(false)
    const [image, setImage] = useState(null)

    return (
        <div className={`works-container ${toggleFullImageView ? 'full-image-view' : ''}`}>
            {toggleFullImageView && 
                <div className='full-image-overlay'>
                    <div onClick={() => setToggleFullImageView(false)} className='close-button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="close-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <img className='full-image' src={image} alt="" />
                </div>
            }

            <div className='works-content'>
                <div className='works-header'>
                    <h1 className='works-title'>How CharitEase works</h1>
                </div>
                <p className='works-description'>GoFundMe is the trusted place to fundraise for what you care about. There is no pressure to hit your fundraising goal and we have created tools to make it easy for donors to contribute to your fundraiser. Learn step-by-step what you need to get started—from writing your story and sharing your fundraiser to setting up bank transfers.</p>
            </div>
            <div className='works-steps'>
                <div className='works-step'>
                    <div className='step-details'>
                        <h1 className='step-number'>01</h1>
                        <h1 className='step-title'>Register Account</h1>
                        <p className='step-description'>Follow a simple steps by filling up email and password and create an account for fundraising.</p>
                    </div>
                    <img onClick={() => [setToggleFullImageView(true), setImage(screenshot1)]} className='step-image' src={screenshot1} alt="Register Account" />
                </div>
                <div className='works-step reverse'>
                    <img onClick={() => [setToggleFullImageView(true), setImage(screenshot2)]} className='step-image2' src={screenshot2} alt="Create Campaign" />
                    <div className='step-details2'>
                        <h1 className='step-number'>02</h1>
                        <h1 className='step-title'>Create Campaign</h1>
                        <p className='step-description'>Enter your campaign details and start raising money.</p>
                    </div>
                </div>
                <div className='works-step'>
                    <div className='step-details'>
                        <h1 className='step-number'>03</h1>
                        <h1 className='step-title'>Add Bank Account</h1>
                        <p className='step-description'>Add your bank details and view your profile and account.</p>
                    </div>
                    <img onClick={() => [setToggleFullImageView(true), setImage(screenshot3)]} className='step-image' src={screenshot3} alt="Withdraw Money" />
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Works;

