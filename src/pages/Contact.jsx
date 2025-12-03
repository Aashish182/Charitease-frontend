import React, { useState } from 'react';
import contactimg from '../asset/images/contact3d.png';
import Footer from '../components/Footer';
import { MdMap, MdCall } from "react-icons/md";
import { IoIosMailUnread } from "react-icons/io";
import './Contact.css'; 
import Banner from './Banner';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Contact = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        number: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const errors = {};

        
        if (!/^[A-Za-z\s]{2,}$/.test(data.name)) {
            toast.error("Name must be at least 2 characters and contain only letters.");
            errors.password = "Name must be at least 2 characters and contain only letters.";
        }

        
        if (!/^[6-9]\d{9}$/.test(data.number)) {
            toast.error("Phone number must be 10 digits.");
            errors.password = "Phone number must be 10 digits.";
        }

        
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(data.email)) {
            toast.error("Please enter a valid email address.");
            errors.password = "Please enter a valid email address.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name , value } = e.target
        setData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }

        const dataResponse = await fetch(SummaryApi.contactDetail.url,{
            method: SummaryApi.contactDetail.method,
            headers: {
                "content-type":"application/json"
            },
            credentials : 'include',
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json();

        if(dataApi.success){
            toast.success(dataApi?.message);
            navigate('/Contact');
        }
        if(dataApi.error){
            toast.error(dataApi?.message)
        }
    };

    return (
        <>
            
            <div className='container-2'>
                <div className='section-main-title'>
                    <h1>Need help? Get in touch</h1>
                </div>
                <div className='section-subtitle'>
                    <p>We're here to listen, advise and help you successfully realize your financial dreams</p>
                </div>

                <div className='contact-grid'>
                    <div className='contact-item'>
                        <MdCall className='contact-item-icon' />
                        <div>
                            <h1 className='contact-item-title'>Ring us</h1>
                            <a className='contact-item-link' href="tel:9930089196">(+91) 99300 89196</a>
                        </div>
                    </div>
                    <div className='contact-item'>
                        <MdMap className='contact-item-icon' />
                        <div>
                            <h1 className='contact-item-title'>Visit us</h1>
                            <p className='contact-item-link'>APSIT ,Thane(W) India</p>
                        </div>
                    </div>
                    <div className='contact-item'>
                        <IoIosMailUnread className='contact-item-icon' />
                        <div>
                            <h1 className='contact-item-title'>Send us an Email</h1>
                            <a className='contact-item-link' href="mailto:help@CharitEase.com">help@CharitEase.com</a>
                        </div>
                    </div>
                </div>

                <div className='form-container'>
                    <img className='contact-img' src={contactimg} alt="Contact" />
                    <div className='form-wrapper'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label className="form-label">Name *</label>
                                <input type="text" className="form-input" placeholder="Apsit Jain" 
                                name='name' value={data.name} onChange={handleChange} required/>
                            </div>
                            <div className='form-group'>
                                <label className="form-label">Email *</label>
                                <input type="text" className="form-input" placeholder="example@gmail.com"
                                name='email' value={data.email} onChange={handleChange} required />
                            </div>
                            <div className='form-group'>
                                <label className="form-label">Phone Number*</label>
                                <input type="text" className="form-input" placeholder="Phone Number"
                                name='number' value={data.number} onChange={handleChange} required />
                            </div>
                            <div className='form-group'>
                                <label className="form-label">Message *</label>
                                <textarea id="message" rows="10" className="form-textarea" placeholder="Start typing..."
                                name='message' value={data.message} onChange={handleChange} required></textarea>
                            </div>
                            <div className='form-group'>
                                <input type='submit' value='Send Message' className='form-submit' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Banner />
            <Footer />
        </>
    );
}

export default Contact;
