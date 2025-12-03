
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Navbar from './components/Navbar';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Works from './pages/Works';
import {CreateCampaign} from './pages/CreateCampaign';
import Loader from './components/Loader';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Profile from './pages/Profile';
import Campaign from './pages/Campaign';
import MyCampaign from './pages/MyCampaign';
import ManageCampaign from './pages/ManageCampaign';
import ViewDonation from './components/ViewDonation';
import EditCampaign from './components/EditCampaign';
import UpdatesCampaign from './components/UpdatesCampaign';
import {ForgetPassword} from './pages/ForgetPassword';
import AdminPanel from './pages/AdminPanel';
import AllUsers from './pages/AllUsers';
import AllCampaigns from './pages/AllCampaigns';
import AllContacts from './pages/AllContacts';
import DonatePage from './pages/DonatePage';
import Failed from './components/Failed';
import Success from './components/Success';
import AllBankDetails from './pages/AllBankDetails';


function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method: SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }
  useEffect(() => {
    fetchUserDetails()
  },[dispatch])


  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/Home",
      element:<><Navbar /><Home/></>
    },
    {
      path:"/Donate",
      element:<><Navbar /><Donate/></>
    },
    {
      path:"/Works",
      element:<><Navbar /><Works/></>
    },
    {
      path:"/Contact",
      element:<><Navbar /><Contact/></>
    },
    {
      path:"/Login",
      element:<><Navbar /><Login /></>
    },
    {
      path:"/Register",
      element:<><Navbar /><Register/></>
    },
    {
      path:"/AdminPanel",
      element:<><Navbar /><AdminPanel/></>,
      children:[
        {
          path:"AllUsers",
          element:<AllUsers/>
        },
        {
          path:"AllCampaigns",
          element:<AllCampaigns/>
        },
        {
          path:"AllContacts",
          element:<AllContacts/>
        },
        {
          path:"AllBankDetails",
          element:<AllBankDetails/>
        }
      ]
    },
    
    {
      path:"/CreateCampaign",
      element:<><Navbar /><CreateCampaign/></>
    },
    {
      path:"/Loader",
      element:<><Navbar /><Loader/></>
    },
    {
      path:"/Profile",
      element:<><Navbar /><Profile/></>
    },
    {
      path:"/ForgetPassword",
      element:<><Navbar /><ForgetPassword/></>
    },
    {
      path:"/Campaign/:id",
      element:<><Navbar /><Campaign/></>
    },
    {
      path:"/MyCampaign/:id",
      element:<><Navbar /><MyCampaign/></>
    },
    {
      path:"/ManageCampaign/:id",
      element:<><Navbar /><ManageCampaign/></>
    },
    {
      path:"/ViewDonation/:id",
      element:<><Navbar /><ViewDonation/></>
    },
    {
      path:"/EditCampaign/:id",
      element:<><Navbar /><EditCampaign/></>
    },
    {
      path:"/UpdatesCampaign/:id",
      element:<><Navbar /><UpdatesCampaign/></>
    },
    {
      path:"/Failed",
      element:<><Navbar /><Failed/></>
    },
    {
      path:"/Success",
      element:<><Navbar /><Success/></>
    },
  ])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails
      }}>
        <RouterProvider router={router} />
      <ToastContainer />
      
      </Context.Provider>
    </>
  );
}

export default App;

