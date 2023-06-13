import { put, takeLatest, all } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPosts,
  fetchComments,
  setPosts,
  setComments,
  setError,
} from "./slice";
import axios from "axios";

function* fetchPostsSaga() {
  try {
    const { data } = yield axios.get(
      `https://jsonplaceholder.typicode.com/posts/`
    );
    yield put(setPosts(data));
  } catch (error: any) {
    // Сам недавно вычитал, в TS 4.4 и выше введено правило, что можно писать any для обработок ошибок в catch для предотвращения проблем с типизацией, убился об это на пару часов
    yield put(setError(error.message));
  }
}

function* fetchCommentsSaga(action: PayloadAction<number>) {
  try {
    const { data } = yield axios.get(
      `https://jsonplaceholder.typicode.com/posts/${action.payload}/comments`
    );
    yield put(setComments(data));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* postSagas() {
  yield all([
    takeLatest(fetchPosts.typePrefix, fetchPostsSaga),
    takeLatest(fetchComments.typePrefix, fetchCommentsSaga),
  ]);
}
