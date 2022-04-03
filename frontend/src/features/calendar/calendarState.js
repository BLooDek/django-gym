import { createSlice } from "@reduxjs/toolkit";

export const calendarState = createSlice({
  name: "calendarDialog",
  initialState: {
    addDialog: false,
    editDialog: false,
    detailsDialog: false,
    currentEvent: null,
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
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
  },
});

export const { setAddDialog, setEditDialog, setDetailsDialog, setCurrentEvent } =
  calendarState.actions;

export default calendarState.reducer;
