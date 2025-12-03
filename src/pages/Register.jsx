import React, { useState } from 'react';
import './Register.css';
import { FaUserAlt, FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { useNavigate, NavLink } from 'react-router-dom';
import loginimg from "../asset/images/login.jpg";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        number: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [pstatus, setPstatus] = useState(false);

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

        const pass =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!pass.test(data.password)) {
            toast.error("Password must be at least 6 characters, with at least one letter and one number.");
            errors.password = "Password must be at least 6 characters, with at least one letter and one number.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }

        const dataResponse = await fetch(SummaryApi.register.url, {
            method: SummaryApi.register.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/Login');
        } else if (dataApi.error) {
            toast.error(dataApi.message);
        }

        console.log("data", dataApi);
    };

    return (
        <div className="container-3">
            <img className="login-img" src={loginimg} alt="login-img" />
            <div className="welcome">
                <h4>Welcome To CharitEase</h4>
            </div>
            <div className="welcome-1">
                <h1>Create Account for CharitEase</h1>
            </div>
            <div className='Register-box'>
                <form onSubmit={handleSubmit} method='post'>
                    <h1>Sign-Up</h1>

                    <div className="input-box">
                        <input
                            type='text'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Full Name'
                            required
                        />
                        <FaUserAlt className='icon' />
                    </div>

                    <div className="input-box">
                        <input
                            type='text'
                            name='number'
                            value={data.number}
                            onChange={handleChange}
                            placeholder='Phone Number'
                            required
                        />
                        <FaPhoneAlt className='icon' />
                    </div>

                    <div className="input-box">
                        <input
                            type='text'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                        <CgMail className='icon' />
                    </div>

                    <div className="input-box">
                        <input
                            type={pstatus ? 'text' : 'password'}
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                        {pstatus ? (
                            <FaEyeSlash className='icon' onClick={() => setPstatus(!pstatus)} />
                        ) : (
                            <FaEye className='icon' onClick={() => setPstatus(!pstatus)} />
                        )}
                    </div>

                    <button type='submit'>Sign Up</button>
                    <div className="login-link">
                        <p>Already have an account? <NavLink to='/Login'>Login</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Register };
