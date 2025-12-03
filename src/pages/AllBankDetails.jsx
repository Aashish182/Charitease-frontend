import React, { useEffect, useState } from 'react';
import './AllBankDetails.css';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { formatDate } from '../utils/dateFormator';

const AllBankDetails = () => {
    const [allBank,setAllBank] = useState([]);

    const fetchAllBanks = async() =>{
        const fetchData = await fetch(SummaryApi.allBank.url,{
        method: SummaryApi.allBank.method,
        credentials: 'include'
        });
        const dataResponse = await fetchData.json();
        console.log("data",dataResponse)
        if(dataResponse.success){
        console.log("success")
        setAllBank(dataResponse.data)
        }
        if(dataResponse.error){
        toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllBanks()
    },[])

    

    return (
        <div>
        <table className='allbanktable'>
            <thead>
            <tr>
                <th className='srno'>Sr_No.</th>
                <th>Account Holder Name</th>
                <th>Account Number</th>
                <th>Mobile Number</th>
                <th>IFSC Code</th>
                <th>Added On</th>
            </tr>
            </thead>
            <tbody className='admintbody'>
            { allBank.length > 0 &&
                allBank.map((el,index) => {
                return(
                    <tr key={el.id || index}>
                    <td>{index +1}</td>
                    <td>{el.fullname}</td>
                    <td>{el.accountnum}</td>
                    <td>{el.mobilenum}</td>
                    <td>{el.ifsc}</td>
                    <td>{formatDate(el?.AddedAt)}</td>
                    </tr>
                )
                })
            }
            </tbody>
        </table>
        </div>
    )
}

export default AllBankDetails
