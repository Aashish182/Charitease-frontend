
import './MyCampaign.css';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import AddBankBanner from '../components/AddBankBanner';
import SummaryApi from '../common';
import LoggedUserCampaignCard from './LoggedUserCampaignCard';

const MyCampaign = () => {

  const params = useParams();
  console.log("param",params)
  
  const[allCampaign,setAllCampaign] = useState([]);

    const fetchAllCampaignByUser = async() =>{
        const response = await fetch(SummaryApi.campaignDetailsUser.url,{
            method: SummaryApi.campaignDetailsUser.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                    userId : params?.id
            })
        })
        const dataResponse = await response.json();
        
        setAllCampaign(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllCampaignByUser()
    },[])
  // const myCampaigns = useSelector(state => state.campaign.data);
  // const isLoading = useSelector(state => state.campaign.isLoading);

//   useEffect(() => {
//     dispatch(fetchCampaignsByUserID(userId)).then(res => {
//       if (res.payload.error) {
//         navigate('/login');
//       }
//     });
//   }, [dispatch, userId, navigate]);

  // popup controls
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <>
      
      {/* {isLoading ? (
        <div className='w-full flex justify-center items-center h-screen text-2xl'>
          <Loader />
        </div>
      ) : (
        ''
      )} */}
      <div className="myCampaign-container">
        <div className='myCampaign-header'>
          <h1 className="myCampaign-title">
            Manage My campaigns
          </h1>
        </div>
        <div className="campaign-cardgrid">
          <div className='campaign-grid'>
            {allCampaign.length > 0 && 
              allCampaign.map((campaign, index) => (
                <LoggedUserCampaignCard
                  key={index}
                  popupVisible={popupVisible}
                  setPopupVisible={setPopupVisible}
                  campaign={campaign}
                  index={index}
                  callFunc={fetchAllCampaignByUser}
                /> 
              
              ))}
              
          </div>
        </div>
        <AddBankBanner />
      </div>
      <Footer />
    </>
  );
};

export default MyCampaign;
