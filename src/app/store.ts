import { configureStore } from "@reduxjs/toolkit";
import posts from "./slices/posts";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: posts,
});

// Полная запись
type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
