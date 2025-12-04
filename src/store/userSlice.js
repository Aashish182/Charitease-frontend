// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUserDetails: (state, action) => {
//       state.user = action.payload;
//     },
//     clearUserDetails: (state) => {
//       state.user = null;
//     }
//   }
// });

// export const { setUserDetails, clearUserDetails } = userSlice.actions;

// export default userSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const getPersistedUser = () => {
  try {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    }
    return null;
  } catch (err) {
    console.warn("Failed to parse persisted user", err);
    return null;
  }
};

const initialState = {
  user: getPersistedUser(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      try {
        if (typeof window !== "undefined" && action.payload !== null) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      } catch (err) {
        console.warn("Failed to persist user to localStorage", err);
      }
    },
    clearUserDetails: (state) => {
      state.user = null;
      try {
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.warn("Failed to remove persisted user from localStorage", err);
      }
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
