import React from 'react';
import './AdminPanel.css';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";


const AdminPanel = () => {

    const user =useSelector(state => state?.user?.user)

return (
    <div className='main-admin-container'>
        <aside className='adminaside'>
            <div className='adminsection'>
                <h1>{user?.role}</h1>
                <div className="adminname">
                    Name: {user?.name}
                </div>
                <div className="adminname">
                    Email: {user?.email}
                </div>
                <div className="adminactions">
                    <nav className='adminnav'>
                        <Link to={"AllUsers"} className={(e)=>{return e.isActive?"active-admin-action":"admin-action"}}><FaUser /> Users</Link>
                        <Link to={"AllCampaigns"} className={(e)=>{return e.isActive?"active-admin-action":"admin-action"}}><MdCampaign size={20}/> Campaigns</Link>
                        <Link to={"AllContacts"} className={(e)=>{return e.isActive?"active-admin-action":"admin-action"}}><MdMessage size={20}/> Contacts Us</Link>
                        <Link to={"AllBankDetails"} className={(e)=>{return e.isActive?"active-admin-action":"admin-action"}}><BsBank2 size={20}/> Bank Details</Link>
                    </nav>
                </div>
            </div>
            
        </aside>

        <main className='adminmain'>
            <Outlet />
        </main>
    </div>
    )
}

export default AdminPanel
