import { createSlice } from "@reduxjs/toolkit";

export const loginForm = createSlice({
  name: "showLoginForm",
  initialState: {
    value: false,
  },
  reducers: {
    switchState: (state) => {
      state.value = !state.value;
      console.log(state.value)
    },
  },
});

export const {switchState} = loginForm.actions

export default loginForm.reducer