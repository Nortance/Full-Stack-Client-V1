import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  id: 0,
  accessToken: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.userName = action.payload.userName;
      state.id = action.payload.id;
      state.accessToken = action.payload.accessToken;
    },
    resetAuthState(state) {
      state.userName = "";
      state.id = 0;
      state.accessToken = false;
    },
  },
});

export const { setAuthState, resetAuthState } = authSlice.actions;

export default authSlice;
