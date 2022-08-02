import { configureStore } from '@reduxjs/toolkit'
import reducer from "./tokenSlice";

export default configureStore({
  reducer: {
    token: reducer
  }
})