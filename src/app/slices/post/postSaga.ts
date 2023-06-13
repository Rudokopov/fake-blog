import { put, takeLatest, all } from "redux-saga/effects";
import { fetchPosts, fetchComments, setPosts, setComments } from "./slice";
import axios from "axios";

function* fetchPostsSaga() {
  try {
    const { data } = yield axios.get(
      `https://jsonplaceholder.typicode.com/posts/`
    );
    yield put(setPosts(data));
  } catch (error) {
    // Обработка ошибок и отправка соответствующего экшена
  }
}

function* fetchCommentsSaga(action) {
  try {
    const { data } = yield axios.get(
      `https://jsonplaceholder.typicode.com/posts/${action.payload}/comments`
    );
    yield put(setComments(data));
  } catch (error) {
    // Обработка ошибок и отправка соответствующего экшена
  }
}

export function* postSagas() {
  yield all([
    takeLatest(fetchPosts.type, fetchPostsSaga),
    takeLatest(fetchComments.type, fetchCommentsSaga),
  ]);
}
