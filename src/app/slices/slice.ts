import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, Status, PostSliceState } from "./types";

import axios from "axios";

const initialState: PostSliceState = {
  posts: [],
  status: Status.LOADING,
  currentPage: 1,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPostsData",
  async (params) => {
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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
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

export const { setItems, setCurrentPage } = postSlices.actions;
export default postSlices.reducer;
