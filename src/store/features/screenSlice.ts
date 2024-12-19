import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Screen = "intro" | "facts" | "quiz";

const initialState: { currentScreen: Screen } = {
  currentScreen: "intro", 
};

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setScreen: (state, action: PayloadAction<Screen>) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setScreen } = screenSlice.actions;

export default screenSlice.reducer;
