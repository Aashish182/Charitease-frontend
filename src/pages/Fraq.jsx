import React from 'react';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import './Fraq.css';

const Fraq = () => {
        const [activeFaq, setActiveFaq] = useState(null);
        const [open, setOpen] = useState(false);
    
    const handleOpen = (id) => {
            setActiveFaq(id);
            setOpen(!open);
    };

    const Fraq = [
        {
            "id": 1,
            "question": "What is crowdfunding?",
            "answer": "Crowdfunding is a method of raising funds for projects, ventures, or causes by collecting small amounts of money from a large number of people, typically via an online platform."
        },
        {
            "id": 2,
            "question": "How does crowdfunding work?",
            "answer": "Individuals or organizations create campaigns on our platform, detailing their project, its goals, and how much funding they need. People who support the project, known as backers, can contribute financially in exchange for rewards or simply to support the cause."
        },
        {
            "id": 3,
            "question": "How do I start a campaign?",
            "answer": "To start a campaign, simply sign up on our platform and follow the steps to create a project. You'll need to provide details about your project, funding goals, timeline, and any rewards you'll offer to backers."
        },
        {
            "id": 4,
            "question": "Is there a fee to use the platform?",
            "answer": "Yes, there is typically a fee associated with using our platform to host your campaign. This fee helps cover the costs of running the website, payment processing, and providing support to campaign creators."
        },
        {
            "id": 5,
            "question": "How do I know if a campaign is legitimate?",
            "answer": "While we strive to vet campaigns to the best of our ability, it's essential for backers to exercise caution and do their own research before supporting a project. Look for campaigns with clear goals, detailed plans, and transparent communication from the project creator."
        }
    ]


return (
    <div className='faq-container'>
        <div className='faq-header'>
            <h1 className='faq-title'>Frequently Asked Questions</h1>
        </div>
        <p className='faq-subtitle'>
            Have another question? Email us at{' '}
            <a className='faq-email' href="mailto:aashishgupta99300@gmail.com">aashishgupta99300@gmail.com</a>
        </p>
        <div className='faq-items'>
            {Fraq && Fraq.map((item, index) => (
            <div className='faq-item' key={index}>
                <div
                onClick={() => handleOpen(item.id)}
                className='faq-question'
                >
                <h1 className='question'>{item.question}</h1>
                <IoIosArrowDown  size={25} />
                </div>
                {open ? item.id === activeFaq ?
                <p className='faq-answer'>{item.answer}</p> : <></>
                : <></>
                } 
            </div>
        ))}
        </div>
    </div>
    );
    }


export default Fraq ;
