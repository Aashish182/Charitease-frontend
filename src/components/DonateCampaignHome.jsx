

import './DonateCampaignHome.css';
import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { MdTune } from "react-icons/md";
import SummaryApi from '../common';
import { ExploreCard } from '../pages/ExploreCard';
import category from '../utils/categorydata';

const DonateCampaignHome = () => {
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [allCampaign, setAllCampaign] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllCampaign = async () => {
        setLoading(true); 
        const response = await fetch(SummaryApi.campaigndetail.url, {
            method: SummaryApi.campaigndetail.method
        });
        const dataResponse = await response.json();
        
        setAllCampaign(dataResponse?.data || []);
        setFilteredCampaigns(dataResponse?.data || []); 
        setLoading(false);
    };

    useEffect(() => {
        fetchAllCampaign();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => {
            const newCategories = new Set(prev);
            if (newCategories.has(category)) {
                newCategories.delete(category); 
            } else {
                newCategories.add(category); 
            }
            return newCategories;
        });
    };

    useEffect(() => {
        if (selectedCategories.size === 0) {
            setFilteredCampaigns(allCampaign);
        } else {
            const filtered = allCampaign.filter(campaign =>
                selectedCategories.has(campaign.category)
            );
            setFilteredCampaigns(filtered); 
        }
    }, [selectedCategories, allCampaign]);

    const resetFilters = () => {
        setSelectedCategories(new Set());
        setFilteredCampaigns(allCampaign); 
    };

    return (
        <div className='campaign-main-container'>
            <div className='campaign-main-header'>
                <h1 className='donate-title'>Explore Campaigns</h1>
            </div>
            <div className='filter-section'>
                <div className='category-buttons'>
                    {category.map((el, index) => (
                        <div 
                            className={`category-button ${selectedCategories.has(el.category) ? 'active' : ''}`}
                            key={index}
                            onClick={() => handleCategoryChange(el.category)} 
                        >
                            <h4>{el.category}</h4>
                            <IoIosArrowDown  className='arrow-icon' />
                        </div>
                    ))}
                </div>
                <div className='reset-button'>
                    <button onClick={resetFilters} className='reset-btn'>
                        Reset <MdTune />
                    </button>
                </div>
            </div>
            <div className="donate-campaign-grid">
                {loading ? (
                    <p>Loading campaigns...</p>
                ) : (
                    filteredCampaigns.map((campaign, index) => (
                        <ExploreCard data={campaign} key={index} />
                    ))
                )}
            </div>
        </div>
    );
};

export default DonateCampaignHome;
