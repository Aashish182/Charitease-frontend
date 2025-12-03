import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';

const CategoryList = () => {

    const [categoryCampaign,setCategoryCampaign] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchCategoryCampaign = async() => {
      setLoading(true)
      const response = await fetch(SummaryApi.categoryCampaign.url);
      const dataResponse = await response.json();
      setLoading(false)
      setCategoryCampaign(dataResponse.data)
    }

    useEffect(() =>{
      fetchCategoryCampaign()
    },[])

  return (
    <div className=''>
      {
        categoryCampaign.map((campaign,index) =>{
          return(
            <>{campaign.name}</>
          )
        })
      }
    </div>
  )
}

export default CategoryList
