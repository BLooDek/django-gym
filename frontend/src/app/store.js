import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/auth/loginSlice'
import loginFormReducer from '../features/auth/loginForm'

export default configureStore({
  reducer: {
    isLogged: loginReducer,
    showLoginForm: loginFormReducer,
  },
})