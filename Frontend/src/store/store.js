import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlices';
// import adminReducer from './slices/adminSlice'
// import chatReducer from './slices/chatSlice';
// import disputeReducer from './slices/disputeSlice';
import userReducer from './slices/userSlice';
import jobReducer from './slices/jobSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // admin: adminReducer,
    // chat: chatReducer,
    // dispute: disputeReducer,
    user: userReducer,
    job: jobReducer,
  },
});

