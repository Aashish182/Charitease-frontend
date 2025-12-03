
import React, { useState } from "react";
import "./ForgetPassword.css"; 
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loginimg from "../asset/images/login.jpg";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.changePassword.url, {
                method: SummaryApi.changePassword.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, oldPassword, newPassword })
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Password changed successfully!");
                navigate('/Login'); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container-3">
            <img className="login-img" src={loginimg} alt="login-img" />
            <div className="welcome">
                <h4>Welcome</h4>
            </div>
            <div className="welcome-2">
                <h1>Change Your Password</h1>
            </div>
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h1>Enter Your Details</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaUserAlt size={25} className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <RiLockPasswordFill size={25} className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <RiLockPasswordFill size={25} className="icon" />
                    </div>

                    <button type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
};

export { ForgetPassword };
