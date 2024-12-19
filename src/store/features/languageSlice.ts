import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "en" | "ru" | "fi" | "uk";

const initialState: { currentLanguage: Language } = {
  currentLanguage: "fi", 
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
