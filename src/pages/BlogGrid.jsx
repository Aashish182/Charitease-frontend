import React from 'react';
import { Link } from 'react-router-dom';
import { GoPeople } from "react-icons/go";
import blogimg from '../asset/images/blog.jpeg';
import './BlogGrid.css';

const BlogGrid = () => {
    return (
        <div className='blog-container'>
            <h1 className='blog-title'>Featured Blog <span className='blog-title-highlight'></span></h1>
            <div className='blog-image-wrapper'>
                <img className='blog-image' src={blogimg} alt="" />
                <Link className='blog-overlay'>
                    <div>
                        <h1 className='blog-title-text'>Revolutionizing Education with Tech: The Story of A P Shah Institute Of Technology</h1>
                        <div className='blog-meta'>
                            <GoPeople size={20}/>
                            <h1>@ APSIT Students</h1>
                            <li className='date'>2024-09-03</li>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BlogGrid;
