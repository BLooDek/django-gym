import { createSlice } from "@reduxjs/toolkit";

export const calendarState = createSlice({
  name: "calendarDialog",
  initialState: {
    addDialog: false,
    editDialog: false,
    detailsDialog: false,
  },
  reducers: {
    setAddDialog: (state, action) => {
      state.addDialog = action.payload;
    },
    setEditDialog: (state, action) => {
      state.editDialog = action.payload;
    },
    setDetailsDialog: (state, action) => {
      state.detailsDialog = action.payload;
    },
    
  },
});

export const { setAddDialog, setEditDialog, setDetailsDialog } =
  calendarState.actions;

export default calendarState.reducer;
