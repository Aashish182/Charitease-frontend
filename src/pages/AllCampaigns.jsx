import React, { useEffect, useState } from 'react';
import './AllCampaigns.css';
import { ExploreCard } from './ExploreCard';
import SummaryApi from '../common';


const AllCampaigns = () => {
  const[allCampaign,setAllCampaign] = useState([]);

    const fetchAllCampaign = async() =>{
        const response = await fetch(SummaryApi.campaigndetail.url,{
            method: SummaryApi.campaigndetail.method
        })
        const dataResponse = await response.json();
        
        setAllCampaign(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllCampaign()
    },[])

  return (
    <div className='admin-allcampaigns'>
      <div className="admin-campaigncard">
        {
          allCampaign.map((campaign,index)=>{
              return(
                <ExploreCard data = {campaign} key={index} />
              )
          })
        }
      </div>
      
    </div>
  )
}

export default AllCampaigns;
