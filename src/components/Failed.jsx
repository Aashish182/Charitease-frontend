
import React from 'react';
import warning from '../asset/images/warning.png';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './Failed.css'; 

const Failed = () => {
  return (
    <div className="failed-container">
      
      <div className="failed-content">
        <div className="failed-message">
          <img className="warning-icon" src={warning} alt="Warning" />
          <h1 className="message-title">Oh Snap!</h1>
          <p className="message-description">
            It seems like the payment has failed. Please try again later.
          </p>
          <div className="button-container-failed">
            <Link to="/" className="button-home-failed">
              Back to Home
            </Link>
            <Link to="/Donate" className="button-explore-failed">
              Donate More
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Failed;
