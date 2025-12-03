import './AllContacts.css'
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { formatDate } from '../utils/dateFormator';

const AllContacts = () => {
    
    const [allContacts,setAllContacts] = useState([]);

    const fetchAllContacts = async() =>{
        const fetchData = await fetch(SummaryApi.allContact.url,{
        method: SummaryApi.allContact.method,
        credentials: 'include'
        });
        const dataResponse = await fetchData.json();
        console.log("data",dataResponse)
        if(dataResponse.success){
        console.log("success")
        setAllContacts(dataResponse.data)
        }
        if(dataResponse.error){
        toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllContacts()
    },[])

    

    return (
        <div>
        <table className='allusertable'>
            <thead>
            <tr>
                <th className='srno'>Sr_No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th> Message </th>
                <th>Sended On</th>
            </tr>
            </thead>
            <tbody className='admintbody'>
            { allContacts.length > 0 &&
                allContacts.map((el,index) => {
                return(
                    <tr key={el.id || index}>
                    <td>{index +1}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.number}</td>
                    <td>{el.message}</td>
                    <td>{formatDate(el?.sendedAt)}</td>
                    </tr>
                )
                })
            }
            </tbody>
        </table>
        </div>
    )
}

export default AllContacts

