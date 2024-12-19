import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./features/languageSlice";
import screenReducer from "./features/screenSlice"

export const store = configureStore({
  reducer: {
    language: languageReducer,
    screen: screenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
