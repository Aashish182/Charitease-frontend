import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './CreateCampaign.css';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';
import category from '../utils/categorydata';


const CreateCampaign = () => {

  const user =useSelector(state => state?.user?.user)

  const navigate = useNavigate();
    const [data, setData] = useState({
      title: " ",
      story:'',
      amount: '',
      image: '',
      category: '',
      creator: user?._id || '',
      location: ''
    });

    const [errors, setErrors] = useState({});
    const validateInputs = () => {
      const errors = {};
      
      if (!/^\d+$/.test(data.amount)) {
          toast.error("Amount must be in digits.");
          errors.password = "Amount must be in digits.";
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
        if (!validateInputs()) {
          return;
        }

        const dataResponse = await fetch(SummaryApi.createCampaign.url,{
            method: SummaryApi.createCampaign.method,
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
            <h1 className='header-title'>Create campaigns</h1>
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
                placeholder='3000₹'
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
                name='image'  onChange={(e) => transformFile(e)} required
              />
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
                Create Campaign 
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export {CreateCampaign};
