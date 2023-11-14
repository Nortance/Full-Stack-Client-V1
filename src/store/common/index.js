import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

// Combine reducers as needed
const commonReducer = combineReducers({
  auth: authSlice.reducer,
  // Add other reducers here
});

export default commonReducer;
