import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import campaignReducer from './campaignSlice';

export const store = configureStore({
  reducer: {
    user : userReducer,
    campaign : campaignReducer,
    // story: storySlice,
    // donation: donationReducer,
    // bank: bankSlice,
  }
})

