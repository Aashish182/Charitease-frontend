import React, { useState } from 'react';
import './ChangeUserRole.css';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const ChangeUserRole = ({
    name,email,role,onClose,userId,callFunc
}) => {
    const [userRole,setUserRole] = useState(role);
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
    }

    const updateUserRole = async() => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role: userRole
            })
        })
        const responseData = await fetchResponse.json();
        console.log("response",responseData)
        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
        if(responseData.error){
            toast.success(responseData.error)
        }
    }

    return (
        <div className='changeuserrole'>
            <div className="changediv">
                <div className="closeicon" onClick={onClose}><IoMdClose size={25} /></div>
                <p className='changeroletitle'>Change User Role</p>
                <div className='changerolename'>Name: {name}</div>
                <div className='changerolename'>Email: {email}</div>
                <div className="roleselect">
                    <div className='rolename'>Role:</div> 
                    <select value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return(
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className='changerolebutton' 
                onClick={updateUserRole} >
                    Change Role
                </button>
            </div>
        </div>
    )
}

export default ChangeUserRole;
