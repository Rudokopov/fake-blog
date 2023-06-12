import { configureStore } from "@reduxjs/toolkit";
import post from "./slices/post/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { post },
});

type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
