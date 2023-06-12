export type FetchPostArgs = {
  sortBy: string;
  search: string;
  currentPage: number;
  currentUser: number;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  comments: string[];
};

export enum Status {
  LOADING = "loading", // Ключ приятно писать UPPERCASE
  SUCCESS = "success",
  ERROR = "error",
}

export interface PostSliceState {
  posts: Post[];
  status: Status.LOADING | Status.SUCCESS | Status.ERROR;
}
