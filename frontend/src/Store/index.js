//store has been created 
//now we have to tell react to use this store
import { configureStore } from '@reduxjs/toolkit'
import auth from './authSlice';
import activate from './activateSlice';

export const store = configureStore({
  reducer: {
      auth,
      activate,
  },
});