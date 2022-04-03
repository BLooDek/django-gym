import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authState";
import authDialogReducer from "../features/auth/authDialogState";
import calendarReducer from "../features/calendar/calendarState"

export default configureStore({
  reducer: {
    isLogged: authReducer,
    authDialog: authDialogReducer,
    calendarDialog: calendarReducer,
  },
});
