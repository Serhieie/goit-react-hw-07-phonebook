import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkTheme: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectDarkTheme = state => state.theme.darkTheme;
