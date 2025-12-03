import React, { useState, useEffect } from 'react';
import './UpdatesCampaign.css';
import Footer from './Footer';
import { GoPeople } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDate, formatTime } from '../utils/dateFormator';
import { VscTrash } from 'react-icons/vsc';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UpdatesCampaign = () => {
  
  const user =useSelector(state => state?.user?.user)
  const params = useParams();
  
  const dispatch = useDispatch();

  const [data, setData] = useState({
    userId: user?._id,
    campaignId: params?.id,
    updateContent: '',
  });

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
      const dataResponse = await fetch(SummaryApi.updateStory.url,{
          method: SummaryApi.updateStory.method,
          headers: {
              "content-type":"application/json"
          },
          credentials : 'include',
          body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json();

      if(dataApi.success){
          toast.success(dataApi?.message);
      }
      if(dataApi.error){
          toast.error(dataApi?.message)
      }

  };

  console.log(params)
  //getting story update
  const [storyData,setStoryData] = useState([])

// const [loading,setLoading] = useState(false);
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
    console.log("dataofstory",dataResponse)
    setStoryData(dataResponse.data);
}

useEffect(() =>{
  fetchStoryUpdates()
},[]);


const deleteStory = async(id) => {
    const response = await fetch(SummaryApi.deletestory.url,{
        method: SummaryApi.deletestory.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
                storyId : id
        })
    });

    const dataApi = await response.json();
    if(dataApi.success){
        toast.success(dataApi.message);
    }
};

  return (
    <div className='campaign-updates-container'>
      <div className='main-update-container'>
        <div className='header-container'>
          <h1>Update your Progress</h1>
        </div>

        {/* {isLoading && <Loader />} */}

        <div className='content-wrapper'>
          <div className='organizer-section'>
            <h1 className='section-update-organizer'>Organizer</h1>
            <div className='organizer-info'>
              <GoPeople size={35} color='#2ebc62' />
              <div className='organizer-details'>
                <h1>{user?.email}</h1>
                <h1>{user?.name}</h1>
              </div>
            </div>

            <div className='updates-section'>
              <h1 className='section-update-organizer'>Updates:</h1>
              <div className='updates-list'>
              { storyData.length > 0 && 
                storyData.map((Sdata, index) => (
                  <div key={index} className='update-item'>
                    <GoPeople color='#2ebc62' className='user-icon' size={30} />
                    <div className='update-details'>
                      <div>{Sdata?.userId?.name}</div>
                      <div>{Sdata?.updateContent}</div>
                      <div className='timestamp'>{formatDate(Sdata?.createdAt)} - {formatTime(Sdata?.createdAt)}</div>
                    </div>
                    <div onClick={() => deleteStory(Sdata._id)} className='delete-button'>
                      <VscTrash size={30} className='trash-icon' />
                    </div>
                  </div>
                ))
              }

              </div>
            </div>
          </div>

          <div className='form-section'>
            <form onSubmit={handleSubmit} className='update-form'>
            
              <div className='form-group'>
                <label className='form-label'>Selected Campaign</label>
                <input
                  disabled
                  className='input-field'
                  type="text"
                  placeholder='Help for treatment of cancer'
                  value={storyData?.campaignId?.title}
                />
              </div>

              <div className='form-group'>
                <label className='form-label'>Write an update*</label>
                <textarea 
                  className='input-field'
                  placeholder='Thank you for all the donations. We started our project and are in midway...'
                  cols="30"
                  rows="5"
                  name='updateContent' value={data.updateContent} onChange={handleChange} required
                ></textarea>
                <p className='note'>Note*: Updates will be posted according to the current timestamp</p>
              </div>
              <div className='submit-button-container'>
                <button type='submit' className='submit-button'>Post Updates</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdatesCampaign;
