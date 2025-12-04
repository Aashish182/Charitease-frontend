import React, { useContext } from "react";
import "./Login.css";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../asset/images/login.jpg";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
    const navigate = useNavigate();
    const {fetchUserDetails} = useContext(Context);

    

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const errors = {};
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

    console.log("data login",data)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }

        const dataResponse = await fetch(SummaryApi.login.url,{
            method: SummaryApi.login.method,
            credentials: 'include',
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message);
            navigate('/Home');
            fetchUserDetails()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    };

    const [pstatus, setPstatus] = useState(false);

    return (
    
        <div className="container-3">
        <img className="login-img" src={loginimg} alt="login-img" />
        <div className="welcome">
            <h4>Welcome Back</h4>
        </div>
        <div className="welcome-2">
            <h1>Login for CharitEase</h1>
        </div>
    <div className="login-box">
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
            <input
            type="text"
            placeholder="Username or Gmail"
            name='email' value={data.email} onChange={handleChange}
            required
            />
            <FaUserAlt size={25} className="icon" />
        </div>
        <div className="input-box">
            <input
            type={pstatus ? "text" : "password"}
            placeholder="Password"
            name='password' value={data.password} onChange={handleChange}
            required
            />
            {pstatus ? (
            <FaEyeSlash className="icon" onClick={() => setPstatus(!pstatus)} />
            ) : (
            <FaEye className="icon" onClick={() => setPstatus(!pstatus)} />
            )}
        </div>
        <div className="remember-forgot">
            <label>
            <input type="checkbox" />
            Remeber Me
            </label>
            <a href="#">
                <Link className='forgot' to='/ForgetPassword'>Forgot Password</Link>
            </a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
            <p>
            Don't have an account?{" "}
            <Link className="" to="/Register">
                Register
            </Link>
            </p>
        </div>
        </form>
    </div>
    </div>
    );
}

export { Login };
