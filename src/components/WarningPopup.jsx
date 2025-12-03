import React from 'react';
import './WarningPopup.css';
import warning from '../asset/images/warning.png';
import { useDispatch } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const WarningPopup = ({ setPopupVisible, id, callFunc, style }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleDelete = async(id) => {
        const response = await fetch(SummaryApi.DeleteCampaign.url,{
            method: SummaryApi.DeleteCampaign.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                    campaignId : id
            })
        });

        const dataApi = await response.json();
        if(dataApi.success){
            toast.success(dataApi.message);
            callFunc()
        }



        setPopupVisible(false);
    };

    return (
        <div className="popuppage" >
        <div className="popuppagediv">
        <div className='popup-overlay'>
            <div className='popup-content'>
                <div className="popupimage">
                    <img className='popup-image' src={warning} alt="Warning" />
                </div>
                
                <h1 className='popup-title'>Are you sure?</h1>
                <hr />
                <div className='popup-text'>
                    Deleting will permanently remove this campaign from our platform.{' '}
                    <span className=''>This cannot be undone!</span>
                </div>
                <hr />
                <div className='popup-buttons'>
                    <button onClick={() => setPopupVisible(false)} className='cancel-button'>
                        Cancel
                    </button>
                    <button onClick={() => handleDelete(id)} className='delete-pop-button'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
};

export default WarningPopup;
