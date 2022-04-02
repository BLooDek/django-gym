import { createSlice } from "@reduxjs/toolkit";

export const authDialogState = createSlice({
  name: "authDialog",
  initialState: {
    loginDialog: false,
    registerDialog: false,
  },
  reducers: {
    setLoginDialog: (state, action) => {
      state.loginDialog = action.payload;
    },
    setRegisterDialog: (state, action) => {
      state.registerDialog = action.payload;
    },
  },
});

export const { setLoginDialog, setRegisterDialog } = authDialogState.actions;

export default authDialogState.reducer;
