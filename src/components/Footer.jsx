import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import logo from '../asset/images/logo.png';
import { FaInstagram,FaTwitter,FaYoutube,FaLinkedin,FaFacebook } from "react-icons/fa";


const Footer = () => {
return (
    <div className="footer">
        <div className="container-1">
            <div className="footer-content">
                <div className="contact-info">
                    <a href="/" className="logo">
                        <img src={logo} alt='' />
                    </a>
                    <div className="contact-details">
                        <h4 className="text1">+91-9930089196</h4>
                        <h4 className="text">help@CharitEase.com</h4>
                        <h4 className="text">APSIT, Kasarvadvali, Thane(W), India</h4>
                    </div>
                </div>
                <div className="footer-links">
                    <NavLink className='text-1' to='/Works'>How it works</NavLink>
                    <NavLink className='text-1' to='/Contact'>Why CharitEase</NavLink>
                    <NavLink className='text-1' to='/Fraq'>Common Questions</NavLink>
                    <NavLink className='text-1' to='/Contact'>Help Center</NavLink>
                    <NavLink className='text-1' to='/Blog'>Blog</NavLink>
                </div>
            </div>
            <div className='find'>
                    <h1 className='font-medium'>Connect with us</h1>
                    <div className='icon'>
                        <a href="#" >
                            <FaFacebook size={30} />
                        </a>
                        <a href="#" >
                            <FaInstagram  size={30} />
                        </a>
                        <a href="#" >
                            <FaTwitter size={30} />
                        </a>
                        <a href="#" >
                            <FaYoutube  size={30} />
                        </a>
                        <a href="#" >
                            <FaLinkedin  size={30} />
                        </a>
                    </div>
                </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024. All rights reserved</p>
            <p>Designed and developed by <a href="#" target="_blank" className="text-green-600">APSIT Students</a></p>
        </div>
        
    </div>
)
}

export default Footer;
