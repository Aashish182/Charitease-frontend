import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import './EditCampaign.css';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';
import category from '../utils/categorydata';


const EditCampaign = () => {

  const user =useSelector(state => state?.user?.user);
  const [campaigndata,setCampaigndata] = useState({
    title: "",
    story: "",
    amount: "",
    image: "",
    category: "",
    creator: "",
    location: "",
    raisedAmount:"",
})

const params = useParams();
// const [loading,setLoading] = useState(false);
const fetchCampaignDetails = async() =>{
    
    const response = await fetch(SummaryApi.campaignDetails.url,{
        method: SummaryApi.campaignDetails.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
                campaignId : params?.id
        })
    })
    

    const dataResponse = await response.json();
    console.log("data",dataResponse)
    setCampaigndata(dataResponse.data);
}

useEffect(() =>{
    fetchCampaignDetails()
},[]);


  const navigate = useNavigate();
  
  const [data, setData] = useState({
    ...campaigndata,
    title: '',
    story:'',
    amount: '',
    image: '',
    category: '',
    creator: user?._id,
    location: ''
  });

  useEffect(() => {
    if (campaigndata) {
        setData({
          ...campaigndata,
            title: campaigndata.title || '',
            story: campaigndata.story || '',
            amount: campaigndata.amount || '',
            image: campaigndata.image || '',
            category: campaigndata.category || '',
            creator: user?._id || '', 
            location: campaigndata.location || '',
        });
    }
}, [campaigndata, user]);

  const handleChange = (e) => {
      const { name , value } = e.target
      setData((preve)=>{
          return {
              ...preve,
              [name] : value
          }
      })
  };

  const transformFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({ ...data, image: reader.result });
    };
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const dataResponse = await fetch(SummaryApi.updateCampaign.url,{
          method: SummaryApi.updateCampaign.method,
          headers: {
              "content-type":"application/json"
          },
          credentials : 'include',
          body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json();

      if(dataApi.success){
          toast.success(dataApi?.message);
          navigate('/Donate');
      }

      if(dataApi.error){
          toast.error(dataApi?.message)
      }

  };

  return (
    <>
      <div className='create-campaign-container'>
        <div className='create-campaign-wrapper'>
          <div className='create-campaign-header'>
            <h1 className='header-title'>Update campaigns</h1>
          </div>
          <form className="create-campaign-form" onSubmit={handleSubmit} >
            <div className='form-group'>
              <label className="form-label">Campaign Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Help me fund my college fee"
                name='title' value={data.title} onChange={handleChange} required
              />
            </div>

            <div className='form-group'>
              <label className="form-label">Campaign Story *</label>
              <textarea
                id="message"
                rows="12"
                className="form-input"
                placeholder="Start typing the summary of your story..."
                name='story' value={data.story} onChange={handleChange} required
              ></textarea>
            </div>

            <div className='form-group'>
              <label className="form-label">Goal Amount *</label>
              <input
                type="number"
                className="form-input"
                placeholder='3000$'
                name='amount' value={data.amount} onChange={handleChange} required
              />
            </div>

            <div className='form-group'>
              <label className="form-label">Upload Image *</label>
              <input
                encType="multipart/form-data"
                type="file"
                className="form-input"
                placeholder="Help me fund my college fee"
                name='image'  onChange={(e) => transformFile(e)} 
              />
              {data.image && (
                                <div className="image-preview">
                                    <img
                                        src={data.image || campaigndata.image}
                                        alt="Campaign Preview"
                                    />
                                </div>
                            )}
            </div>

            <div className='form-group'>
              <label className="form-label">Select category</label>
              <select className="form-input" name='category' value={data.category} onChange={handleChange} placeholder="Category" required>
                <option>Select Category</option>
                {
                  category.map((el,index) => {
                    return(
                      <option value={el.value} key={el.value+index}> {el.label} </option>
                    )
                  })
                }
              </select> 
            </div>

            <div className='form-group'>
              <label className="form-label">Campaign Creator * </label>
              <div className='campaign-creator' name='creator' value={user?.name} onChange={handleChange}>{user?.name}</div>
              {/* <input
                type="text"
                className="form-input"
                placeholder='Campaign Creator Name' required
              /> */}
            </div>

            <div className='form-group'>
              <label className="form-label">Location </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter location"
                name='location' value={data.location} onChange={handleChange} required
              />
            </div>

            <div className='form-group'>
              
              <button type='submit'  className='submit-button'>
                Update Campaign 
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default EditCampaign;
