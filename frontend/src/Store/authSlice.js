//action or reducer is same
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  user : null,
  otp : {
    hash : '',
    phone : '',
  },

}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuth: (state,action) => {
    
    },
    setOtp: (state,action) => {
         const {phone ,hash}= action.payload;
         state.otp.phone=phone;
         state.otp.hash=hash;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth,setOtp } = authSlice.actions

export default authSlice.reducer