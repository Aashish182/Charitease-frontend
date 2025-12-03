import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { FaStarOfLife } from 'react-icons/fa';
import {  useSelector } from 'react-redux';
import { VscTrash } from 'react-icons/vsc';
import AddBankAccount from '../components/AddBankAccount';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Profile = () => {

    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    
    const user =useSelector(state => state?.user?.user);
    
    const[allBank,setAllBank] = useState([]);
    console.log(user?._id)
    const fetchAllBank = async() =>{
        const response = await fetch(SummaryApi.bankdetail.url,{
            method: SummaryApi.bankdetail.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user?._id
            })
        })
        const dataResponse = await response.json();
        console.log("res",dataResponse)
        setAllBank(dataResponse?.data || [])
    }

    const handleDelete = async(id) => {
        const response = await fetch(SummaryApi.deletebank.url,{
            method: SummaryApi.deletebank.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                bankId : id
            })
        });

        const dataApi = await response.json();
        if(dataApi.success){
            toast.success(dataApi.message);
            fetchAllBank();
        }
    };

    useEffect(() => {
        fetchAllBank();
    },[])



    return (
        <div className='profile-container'>
            <h1 className='profile-title'>Profile</h1>
            <div>
                <h1 className='profile-section-title'>User</h1>
                <div className='profile-content'>
                    <h1 className='profile-field'><span>Email:</span>
                        <span>{user?.email}</span></h1>
                    <h1 className='profile-field'><span>Name:</span>
                        <span>{user?.name}</span></h1>
                    <h1 className='profile-field'><span>Password:</span>
                        <div className='password-block'>
                            <span className='password-stars'>
                                {[...Array(7)].map((_, index) => (
                                    <FaStarOfLife key={index} size={10} />
                                ))}
                            </span>
                            <Link className='change-password-link' to={'/forgotPassword'}>
                                Change
                            </Link>
                        </div>
                    </h1>
                </div>
            </div>
            <div className="profile-bank">
                <h1 className='profile-section-title'>Bank Accounts</h1>
                <div className="profile-bank-content">
                {allBank.length >0 ? (
                    allBank.map((bank,index) =>{ return(<>
                    <div className='profile-field' key={index}>
                        <span>Account Number:</span>
                        <span className='account-details'>
                            {bank?.accountnum}
                            <button  className="delete-btn">
                                <VscTrash onClick={() => handleDelete(bank?._id)} />
                            </button>
                        </span>
                    </div>
                    <div className='profile-field'>
                        <span>IFSC Code:</span>
                        <span className='account-details'>
                            {bank?.ifsc}
                        </span>
                    </div>
                    <div className='profile-field'>
                        <span>Account Holder Name:</span>
                        <span className='account-details'>
                            {bank?.fullname}
                        </span>
                    </div>
                    <div className='no-account-header'>
                        Add More Account
                        <button  className='add-account-btn' onClick={() => setOpenUpdateRole(true)}  >
                            Add account
                        </button>
                    </div>
                    </>
                ) })
                    
                ) : (
                <>
                    <div className='no-account-header'>
                        No bank accounts found
                        <button  className='add-account-btn' onClick={() => setOpenUpdateRole(true)}  >
                            Add account
                        </button>
                    </div>
                    {
                        openUpdateRole && (
                        <AddBankAccount 
                        onClose={() => setOpenUpdateRole(false)} 
                        callFunc={fetchAllBank}
                        />
                        )
                    }
                    
                </>
                )
            }
                </div>
            </div>
            {/* <div className="profile-bank">
                <h1 className='profile-section-title'>Payout History</h1>
                <div className="profile-bank-content">
                 */}
                    {/* <div className='account-info'>
                        <span>Account Details</span>
                        <span className='account-details'>
                            abc
                            <button  className="delete-btn">
                                <VscTrash />
                            </button>
                        </span>
                    </div>
                    <div className='balance-info'>
                        <span>Freeze Balance</span>
                        <h1>$2</h1>
                    </div>
                    <div className='balance-info'>
                        <span>Account Balance</span>
                        <div className='balance-actions'>
                            <h1>$3</h1>
                            <button  className='payout-btn'>
                                Request Payout
                            </button>
                        </div>
                    </div> */}
                
            
                
                    {/* <div className='no-account-header'>
                        No Payout History found
                    </div>
                
            
                </div>
            </div> */}
        </div>
    );
};

export default Profile;

