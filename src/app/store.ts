import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import post from "./slices/post/slice";
import { useDispatch } from "react-redux";
import { postSagas } from "./slices/post/postSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { post },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(postSagas);

type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
