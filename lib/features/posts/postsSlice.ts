import { loadComments } from "./../../api/posts/index";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type PostModel = {
  userId: number;
  id: number;
  title: string;
  body: string;
  createdAt: number;
  formattedCreatedAt?: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

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
      state.posts = action.payload.posts;
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
