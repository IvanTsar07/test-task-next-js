import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { PostModel, Comment } from "./types";

export type PostsState = {
  isLoading: boolean;
  posts: PostModel[];
  comments: Record<string, Comment[]>;
};

export const initialPostsState: PostsState = {
  posts: [],
  isLoading: false,
  comments: {},
};

export const postsAdapter = createEntityAdapter<PostModel>();

export const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState(initialPostsState),
  reducers: {
    setPosts: (state, action: PayloadAction<{ posts: PostModel[] }>) => {
      postsAdapter.setAll(state, action.payload);
    },
    loadComments: (_, _2: PayloadAction<{ postId: string }>) => {},
    loadCommentsSuccess: (
      state,
      action: PayloadAction<{
        postId: string;
        comments: Comment[];
      }>
    ) => {
      state.comments[action.payload.postId.toString()] =
        action.payload.comments;
    },
    loadCommentsFailed: (_, _2: PayloadAction<{ postId: number }>) => {},
  },
});
