import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common";

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
  // Add any middleware here
});

// Exporting the dispatch type as a convenience
export const dispatch = store.dispatch;
