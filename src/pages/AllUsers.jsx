import React, { useEffect, useState } from 'react';
import './AllUsers.css';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { formatDate, formatTime } from '../utils/dateFormator';
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
  const [allUsers,setAllUsers] = useState([]);
  const [updateUserDetails,setUpdateUserDetails] = useState({
    email : "",
    name : "",
    role : "",
    _id : ""
  })

  const fetchAllUsers = async() =>{
    const fetchData = await fetch(SummaryApi.allUser.url,{
      method: SummaryApi.allUser.method,
      credentials: 'include'
    });
    const dataResponse = await fetchData.json();
    console.log("data",dataResponse)
    if(dataResponse.success){
      console.log("success")
      setAllUsers(dataResponse.data)
    }
    if(dataResponse.error){
      toast.error(dataResponse.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  },[])

  console.log("alluser",updateUserDetails.role);

  return (
    <div>
      <table className='allusertable'>
        <thead>
          <tr>
            <th>Sr_No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='admintbody'>
          { allUsers.length > 0 &&
            allUsers.map((el,index) => {
              return(
                <tr key={el.id || index}>
                  <td>{index +1}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.role}</td>
                  <td>{formatDate(el?.createdAt)}</td>
                  <td className='td' >
                    <div className='editbutton' 
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                    }}><FaEdit/></div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole 
          onClose={() => setOpenUpdateRole(false)} 
          name={updateUserDetails.name} 
          email={updateUserDetails.email} 
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}/>
        )
      }
      
    </div>
  )
}

export default AllUsers
