export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  userId: number;
  id: number;
  email: string;
  body: string;
};

export enum Status {
  LOADING = "loading", // Ключ приятно писать UPPERCASE
  SUCCESS = "success",
  ERROR = "error",
}

export interface PostSliceState {
  posts: Post[];
  comments: Comment[];
  status: Status.LOADING | Status.SUCCESS | Status.ERROR;
  currentPage: number;
}

export interface fetchCommentsArgs {
  currentPost: number;
}
