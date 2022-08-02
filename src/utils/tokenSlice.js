import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: ''
  },
  reducers: {
    logout: state => {
      state.token = ''
    },
    login: (state, action) => {
      state.token = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = tokenSlice.actions

export default tokenSlice.reducer