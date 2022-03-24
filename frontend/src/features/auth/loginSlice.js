import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "isLogged",
  initialState: {
    value: false,
    credentials: null,
  },
  reducers: {
    setLogged: (state, action) => {
      state.value = action.payload
    },
    setCredentials: (state, action) => {
      state.credentials = action.payload;
    }
    
    
  },
});

export const { setLogged, setCredentials } = loginSlice.actions;

export default loginSlice.reducer;
