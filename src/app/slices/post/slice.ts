import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Post,
  Status,
  PostSliceState,
  Comment,
  fetchCommentsArgs,
} from "./types";

import axios from "axios";

const initialState: PostSliceState = {
  posts: [],
  comments: [],
  status: Status.LOADING,
  currentPage: 1,
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

export const fetchComments = createAsyncThunk<Comment[], fetchCommentsArgs>(
  "posts/fetchCommentsData",
  async (params) => {
    const { currentPost } = params;
    const { data } = await axios.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${currentPost}/comments`
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
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
      state.status = Status.ERROR;
    });

    // Reducer для Комментов

    builder.addCase(fetchComments.pending, (state) => {
      state.comments = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.comments = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setPosts, setCurrentPage, setComments } = postSlices.actions;
export default postSlices.reducer;
