import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: JSON.parse(window.localStorage.getItem("mode")) || "light",
  reducers: {
    setTheme: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
