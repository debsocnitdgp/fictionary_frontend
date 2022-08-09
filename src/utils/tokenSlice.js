import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("fictionary_token")
      state.value = "";
    },
    login: (state, action) => {
      console.log("setting token to " + action.payload);
      localStorage.setItem("fictionary_token", action.payload);
      state.value = action.payload;
      console.log(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
