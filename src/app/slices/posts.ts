import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, Status, PostSliceState, FetchPostArgs } from "./types";
import axios from "axios";

const initialState: PostSliceState = {
  posts: [],
  status: Status.LOADING,
};

export const FetchPosts = createAsyncThunk<Post[], FetchPostArgs>(
  "posts/fetchPostsData",
  async (params) => {
    const { sortBy, search, currentPage, currentUser } = params;
    const { data } = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts`
    );
    return data;
  }
);

const Posts = createSlice({
  name: "post",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(FetchPosts.pending, (state) => {
      state.posts = [];
      state.status = Status.LOADING;
    });
    builder.addCase(FetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(FetchPosts.rejected, (state) => {
      state.posts = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = Posts.actions;
export default Posts.reducer;
