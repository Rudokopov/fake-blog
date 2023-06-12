import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, Status, PostSliceState, FetchPostArgs } from "./types";

import axios from "axios";

const initialState: PostSliceState = {
  posts: [],
  status: Status.LOADING,
};

export const fetchPosts = createAsyncThunk<Post[], FetchPostArgs>(
  "posts/fetchPostsData",
  async (params) => {
    const { currentPage } = params;
    const { data } = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts/`
    );
    return data;
  }
);

const postSlices = createSlice({
  name: "post",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
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
  },
});

export const { setItems } = postSlices.actions;
export default postSlices.reducer;
