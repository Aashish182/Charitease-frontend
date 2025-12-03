import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './Loader.css';

const Loader = () => {
    return (
        <div className='loader-container'>
            <FaSpinner className='loader-icon' size={50} />
        </div>
    );
}

export default Loader;
