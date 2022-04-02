import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authState'
import authDialogReducer from '../features/auth/authDialogState'

export default configureStore({
  reducer: {
    isLogged: authReducer,
    authDialog: authDialogReducer,
  },
})