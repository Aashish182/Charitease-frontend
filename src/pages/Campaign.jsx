
import React, { useEffect, useState } from 'react';
import './Campaign.css';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
import { LuClock3 } from "react-icons/lu";
import { GoGoal, GoPeople } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../utils/dateFormator';
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import SummaryApi from '../common';
import Story from '../components/Story';
import DonatePage from './DonatePage';
import { toast } from 'react-toastify';
import DonationList from '../components/DonationList';


const Campaign = () => {
    const [openTab, setOpenTab] = useState(1);
    const [openDonateTab, setOpenDonateTab] = useState(false);
    
    const user =useSelector(state => state?.user?.user);
    const campaign =useSelector(state => state?.campaign?.campaign)
    
    const [donateAmount,setDonateAmount] = useState({
        amount: ""
    })

    const handleChange = (e) => {
        const { name , value } = e.target
        setDonateAmount((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    };

    const openDonate=(amount) => {
    
        if (!/^\d+$/.test(amount)) {
            toast.error("Amount must be in digits.");
        } else if (!amount) {
            toast.error("Please provide a donation amount.");
        } else if (amount < 20) {
            toast.error("Minimum contribution is ₹20.");
        } else {
            setOpenDonateTab(true); 
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        openDonate(donateAmount.amount);
    };

    const [data,setData] = useState({
        title: "",
        story: "",
        amount: "",
        image: "",
        category: "",
        creator: "",
        location: "",
        raisedAmount:"",
        createdBy:"",
    })



    const params = useParams();
    console.log(campaign?.title);
    const [loading,setLoading] = useState(false);

    const fetchCampaignDetails = async() =>{
        setLoading(true);
        const response = await fetch(SummaryApi.campaignDetails.url,{
            method: SummaryApi.campaignDetails.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                    campaignId : params?.id
            })
        })
        setLoading(false);

        const dataResponse = await response.json();
        
        setData(dataResponse.data);
        fetchUserData(dataResponse?.data?.creator);
    }
    
    const [creatorName, setCreatorName] = useState('');
    const fetchUserData = async (userId) => {
        if (!userId) return;

        const response = await fetch(SummaryApi.campaignuser.url, {
            method: SummaryApi.campaignuser.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ userId })
        });

        const dataResponse = await response.json();
        console.log("name",dataResponse)
        setCreatorName(dataResponse.data);
    };

    const [donationData,setDonationData] = useState([])

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
        fetchUserData(dataResponse?.data[0]?.userId);
        setDonationData(dataResponse.data);
    }

    


    const [storyData,setStoryData] = useState([])


    const fetchStoryUpdates = async() =>{
    const response = await fetch(SummaryApi.getUpdateStory.url,{
        method: SummaryApi.getUpdateStory.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
                campaignId : params?.id
        })
        })
        const dataResponse = await response.json();
        console.log("donation",dataResponse?.data?.userId)
        fetchUserData(dataResponse?.data?.userId);
        setStoryData(dataResponse.data);
    }


    useEffect(() =>{
        fetchStoryUpdates()
        fetchCampaignDetails()
        fetchDonationDetail()
        fetchUserData()
    },[])


    // calculating donation raised by campaign
    // const donationRaised = donations.reduce((acc, curr) => acc + curr.amount, 0);

    const calculateGoalPercent = () => {
        const goal = Math.round((data?.raisedAmount / data?.amount) * 100);
        return goal > 100 ? 100 : goal;
    };
    console.log("amount",params?.id);

    return (
        <div>
            
            {/* {isLoading && (
                <div className='w-full flex justify-center items-center h-screen text-2xl'>
                    <Loader />
                </div>
            )} */}
            {
            
            <div className='campaign-container'>
                <div className='main_campaign_container'>
                    <div className='campaign-left'>
                        <img className='campaign-image' src={data?.image} alt="" />
                        <h1 className='campaign-title'>{data?.title} </h1>
                        <div className='campaign-owner'>
                            <div className='owner-icon'>
                                <GoPeople size={25} color='white' />
                            </div>
                            <div>
                                <h1 className='campaign-owner-name'>
                                    
                                    {creatorName?.name}
                                </h1>
                            </div>
                        </div>

                        <div className='campaign-tabs'>
                            <div onClick={() => setOpenTab(1)} className={`tab-button ${openTab === 1 ? 'active-tab' : ''}`}>Overview</div>
                            <div onClick={() => setOpenTab(2)} className={`tab-button ${openTab === 2 ? 'active-tab' : ''}`}>
                                Donations {/*donations.length*/ 1 > 0 && <span className='tab-count'>{/*donations.length*/}</span>}
                            </div>
                            <div onClick={() => setOpenTab(3)} className={`tab-button ${openTab === 3 ? 'active-tab' : ''}`}>
                                Updates {/*story.length*/1 > 0 && <span className='tab-count'>{/*story.length*/}</span>}
                            </div>
                        </div>

                        {openTab === 1 && (
                            <div className='tab-content'>
                                <h1 className='tab-details-title'>Details:</h1>
                                <p className='tab-details'>{data?.story} </p>
                            </div>
                        )}

                        {openTab === 2 && (
                            <div className='tab-content'>
                                <DonationList donation={donationData} user={creatorName?.name}/>
                            </div>
                        )}

                        {openTab === 3 && (
                            <div className='tab-content'>
                                <Story story={storyData} user={creatorName?.name}/>
                            </div>
                        )}
                    </div>
            
                    {/* Right side */}
                    <div className='campaign-right'>
                        <h1 className='raised-amount'>₹ {data?.raisedAmount}<sub className='raised-sub'>Raised</sub></h1>
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${calculateGoalPercent()}%` }}></div>
                        </div>
                        <div className='campaign-stats'>
                            <div className='campaign-stat'>
                                <h1 className='stat-value'>₹ {data?.amount}</h1>
                                <h1 className='stat-label'><GoGoal color='#2ebc62' /> Goal</h1>
                            </div>
                            <div className='campaign-stat'>
                                <h1 className='stat-value'>{donationData?.length}</h1>
                                <h1 className='stat-label'><FaHeart className='heart' color='Red' /> Contributers</h1>
                            </div>
                            <div className='campaign-stat'>
                                <h1 className='stat-value'>₹ 20</h1>
                                <h1 className='stat-label'><GiFlowerPot className='flower-pot' color='#2ebc62' /> Min. Contribution</h1>
                            </div>
                            <div className='campaign-stat'>
                                <h1 className='stat-value'>{formatDate(data?.createdAt)}</h1>
                                <h1 className='stat-label'><LuClock3 className='lock' color='#2ebc62' /> Created at</h1>
                            </div>
                        </div>
                        

                        {user?.name? (
                            <div className='login-message'>
                            <form className='donation-form' onSubmit={handleSubmit}>
                                <label>Support with a Donation </label>
                                <input type="number" placeholder='₹20' name='amount' value={donateAmount.amount} className='donation-input' onChange={handleChange}/>
                                <input type="submit" value='Donate Now' className='donate-btn'  />
                                {
                                    openDonateTab && (
                                    <DonatePage 
                                    onClose={() => setOpenDonateTab(false)} 
                                    callFunc={fetchCampaignDetails}
                                    amount = {donateAmount.amount}
                                    userId = {user?._id}
                                    campaign = {data}
                                    />
                                    )
                                }
                            </form>
                            </div>
                        ) : (
                            <div className='login-message'>
                                <form className='donation-form blur'>
                                    <label>Support with a Donation </label>
                                    <input type="number" placeholder='₹20' className='donation-input' />
                                    <input type="submit" value='Donate Now' className='donate-btn' />
                                </form>
                                <div className='login-overlay'>
                                    <MdOutlineReportGmailerrorred className='login-icon' size={50} />
                                    <p>Please Login!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
            <Footer />
        </div>
    );
}

export default Campaign;

