import { createSlice } from "@reduxjs/toolkit";

export const authState = createSlice({
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

export const { setLogged, setCredentials } = authState.actions;

export default authState.reducer;
