import { AppState } from "@/lib/store";
import { PostsState } from "./postsSlice";
import { createSelector } from "@reduxjs/toolkit";
import { selectUsers } from "../users/selectors";
import { PostModel } from "./types";

export const selectPosts = (state: AppState) => state.posts;
export const selectComments = (state: AppState) => state.posts.comments;

export const selectExtendedPostsList = createSelector(
  selectPosts,
  selectComments,
  selectUsers,
  (posts: PostsState, comments, users) => {
    const postsList = posts.posts.map((post: PostModel) => {
      return {
        ...post,
        user: users.find(user => user.id === post.userId),
        formattedCreatedAt: new Date(post.createdAt).toLocaleDateString(
          undefined,
          {
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "numeric",
          }
        ),
      };
    });

    postsList.sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
    );

    return postsList;
  }
);

export const selectPostById = (id: number) =>
  createSelector(
    selectPosts,
    selectComments,
    selectUsers,
    (posts: PostsState, comments, users) => {
      const post = posts.posts.find((post: PostModel) => post.id === id);

      if (post) {
        return {
          ...post,
          comments: comments[post.id.toString()] || [],
          user: users.find(user => user.id === post.userId),
        };
      }
    }
  );
