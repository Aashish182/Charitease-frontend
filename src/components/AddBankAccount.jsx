import React, { useState } from 'react';
import './AddBankAccount.css';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddBankAccount = ({
    onClose,callFunc
}) => {
    
    const user =useSelector(state => state?.user?.user);

    const navigate = useNavigate();
    const [data, setData] = useState({
        fullname: "",
        accountnum: "",
        mobilenum: "",
        ifsc: "",
        bankuser: user?._id
    });

    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const errors = {};

        // Validate Full Name
        if (!/^[A-Za-z\s]{2,}$/.test(data.fullname)) {
            toast.error("Full Name must be at least 2 characters and contain only letters.");
            errors.fullname = "Full Name must be at least 2 characters and contain only letters.";
        }

        // Validate Account Number
        if (!/^\d{9,18}$/.test(data.accountnum)) {
            toast.error("Account Number must be between 9 to 18 digits.");
            errors.accountnum = "Account Number must be between 9 to 18 digits.";
        }

        // Validate Mobile Number
        if (!/^[6-9]\d{9}$/.test(data.mobilenum)) {
            toast.error("Phone number must be 10 digits and start with 6-9.");
            errors.mobilenum = "Phone number must be 10 digits and start with 6-9.";
        }

        // Validate IFSC Code
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifsc)) {
            toast.error("IFSC Code must start with 4 uppercase letters followed by 0 and then 6 alphanumeric characters.");
            errors.ifsc = "IFSC Code must start with 4 uppercase letters followed by 0 and then 6 alphanumeric characters.";
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
        
        const dataResponse = await fetch(SummaryApi.addbank.url,{
            method: SummaryApi.addbank.method,
            headers: {
                "content-type":"application/json"
            },
            credentials : 'include',
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json();

        if(dataApi.success){
            toast.success(dataApi?.message);
            onClose();
            callFunc()
        }
        if(dataApi.error){
            toast.error(dataApi?.message)
        }

    };

return (
    <div className='addbankaccount'>
            <div className="addbankdiv">
                <div className="bank-title">
                    <p className='bank-account-title'>Add Bank Account</p>
                    <div className="bank-closeicon" onClick={onClose}><IoMdClose size={25} /></div>
                </div>
                <form className="bankform" onSubmit={handleSubmit} >
                    <div className='bank-group'>
                    <label className="bank-label">Full Name</label>
                    <input
                        type="text"
                        className="bank-input"
                        placeholder="Fullname As per Bank Account"
                        name='fullname' value={data.fullname} onChange={handleChange} required
                    />
                    </div>

                    <div className='bank-group'>
                    <label className="bank-label">Account Number</label>
                    <input
                        type="text"
                        className="bank-input"
                        placeholder="Account Number"
                        name='accountnum' value={data.accountnum} onChange={handleChange} required
                    />
                    </div>

                    <div className='bank-group'>
                    <label className="bank-label">Mobile Number</label>
                    <input
                        type="text"
                        className="bank-input"
                        placeholder='+91-9009006262'
                        name='mobilenum' value={data.mobilenum} onChange={handleChange}  required
                    />
                    </div>

                    <div className='bank-group'>
                    <label className="bank-label">IFSC Code</label>
                    <input
                        type="text"
                        className="bank-input"
                        placeholder="BOB0SCGFH"
                        name='ifsc' value={data.ifsc} onChange={handleChange} required
                    />
                    </div>
                    <div>
                    <button type='submit'  className='bank-submit-button'>
                        Add Bank Account
                    </button>
                    </div>
                </form>
            </div>
    </div>
)
}

export default AddBankAccount
