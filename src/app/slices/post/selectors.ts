import { RootState } from "../../store";
import { PostSliceState } from "./types";
export const selectPostData = (state: RootState) => state.post;
