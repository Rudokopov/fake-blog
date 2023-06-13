import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest, all } from "redux-saga/effects";
import { Post, Status, PostSliceState, Comment } from "./types";
import { postSagas } from "./postSaga";

import axios from "axios";

const initialState: PostSliceState = {
  posts: [],
  comments: [],
  status: Status.LOADING,
  currentPage: 1,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPostsData",
  async () => {
    const { data } = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts/`
    );
    return data;
  }
);

export const fetchComments = createAsyncThunk<Comment[], number>(
  "posts/fetchCommentsData",
  async (postId: number) => {
    const { data } = await axios.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return data;
  }
);

const postSlices = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = Status.ERROR;
      // state.error = "Failed to fetch posts";
    });
    builder.addCase(fetchComments.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.status = Status.ERROR;
      state.error = "Failed to fetch comments";
    });
  },
});

export const { setPosts, setCurrentPage, setComments, setError } =
  postSlices.actions;
export default postSlices.reducer;
