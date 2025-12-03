import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import './ViewDonation.css';
import { useParams } from 'react-router-dom';
import { formatDate } from '../utils/dateFormator';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ViewDonation = () => {
    
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

    const params = useParams();
    const [loading,setLoading] = useState(false);
    
    const [donationData,setDonationData] = useState([]);
    const [data, setData] = useState({
        amount: 0,
    });

    const fetchDonationDetail = async() =>{
        setLoading(true);
        const response = await fetch(SummaryApi.donationDetail.url,{
            method: SummaryApi.donationDetail.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                    campaignId : params?.id
            })
        })
        setLoading(false);

        const dataResponse = await response.json();
        setDonationData(dataResponse.data);

        if (dataResponse?.data?.amount) {
            setData(prevData => ({
                ...prevData,
                amount: dataResponse?.data?.amount
            }));
        }
    }

    const handleWithdraw = () => {
        if(allBank.length > 0){
            toast.success("Donation Amount Withdrawn in Your Account.");
        } else {
            toast.error("First Add Your Bank Account !");
        }
    };
    console.log(data?.amount)

    const handleSubmit = async () => {
        if (data.amount > 0) {
            const response = await fetch(SummaryApi.withdraw.url, {
                method: SummaryApi.withdraw.method,
                headers: {
                    "content-type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            const dataApi = await response.json();
            console.log(dataApi);
        } 
    };
    

    useEffect(() =>{
        fetchAllBank()
        fetchDonationDetail()
    },[])

    

    return (
        <div>
            <div className="donation-container">
                <div className="donation-header">
                    <h1>Collected Donations</h1>
                </div>
                <div className="table-container">
                    <table className="donations-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Donator</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody  className='donation-tbody'>
                        {
                            donationData.length > 0 ? (
                                donationData.map((item) => (
                                    <tr key={item._id}>
                                        <td>{formatDate(item.donatedAt)}</td>
                                        <td>{item?.cardemail}</td>
                                        <td>₹ {item?.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <h1 className="no-donations">No Donations Found!</h1>
                            )
                        }
                            
                        </tbody>
                        
                    </table>
                </div>
                <div className="payout-donation" 
                    onClick={() => {
                    handleWithdraw();
                    handleSubmit();
                    }}
                >
                    <h6> Withdraw Donations </h6>
                </div>
            </div>
            <div className="donation-footer">
                <Footer />
            </div>
        </div>
    );
};

export default ViewDonation;

