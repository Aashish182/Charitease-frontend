
import React from 'react';
import './Success.css';
import Footer from './Footer';
import success from '../asset/images/success1.gif';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <div className='success-container'>
        <div className='success-content'>
          <img className='success-image' src={success} alt="Payment Success" />
          <h1 className='success-title'>Payment Successful</h1>
          <p className='success-message'>
            Payment successfully completed! You're now a member of an elite community helping others achieve their goals.
          </p>
          <div className='success-actions'>
            <Link to={"/"} className='success-btn success-btn-primary'>Back to Home</Link>
            <Link to={"/Donate"} className='success-btn success-btn-secondary'>Donate More</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
