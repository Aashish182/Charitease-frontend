import React, { useEffect, useState } from 'react';
import { ExploreCard } from './ExploreCard';
import './Donate.css';
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import SummaryApi from '../common';
import Footer from '../components/Footer';
import Banner from './Banner';
import category from '../utils/categorydata';

const Donate = () => {

    const [allCampaign, setAllCampaign] = useState([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(new Set());

    const fetchAllCampaign = async () => {
        const response = await fetch(SummaryApi.campaigndetail.url, {
            method: SummaryApi.campaigndetail.method
        });
        const dataResponse = await response.json();

        setAllCampaign(dataResponse?.data || []);
        setFilteredCampaigns(dataResponse?.data || []);
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
        <div className='main-container'>
            <div className="header">
                <h1>Campaigns for Donation</h1>
            </div>
            <div className="maincontainer">
                <aside className='sidebar'>
                    <div className="sidebar-1">
                        <div className='filter-option'>
                            <h4>Filter By</h4>
                            <div className='button-filter'>
                                <button className='filter-button' onClick={resetFilters}>
                                    <h6>Reset<HiAdjustmentsHorizontal /></h6>
                                </button>
                            </div>
                        </div>
                        {category.map((el, index) => (
                            <div className='filter' key={index}>
                                <label>
                                    <h4>{el.category}</h4>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.has(el.category)}
                                        onChange={() => handleCategoryChange(el.category)}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className='main'>
                    <div className="cards">
                        {filteredCampaigns.map((campaign, index) => (
                            <ExploreCard data={campaign} key={index} />
                        ))}
                    </div>
                </main>
            </div>
            <Banner />
            <Footer />
        </div>
    );
};

export default Donate;
