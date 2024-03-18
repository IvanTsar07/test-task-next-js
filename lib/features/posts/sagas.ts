import { loadComments, loadPost } from "@/lib/api/posts";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { postsSlice } from "./postsSlice";
import { usersSlice } from "../users/usersSlice";

export function* loadCommentsSaga(
  action: PayloadAction<{ postId: string }>
): Generator<any, void, any> {
  const response = yield call(loadComments, action.payload.postId);

  yield put(
    postsSlice.actions.loadCommentsSuccess({
      postId: action.payload.postId,
      comments: response,
    })
  );
}

export function* loadPostSaga(
  action: PayloadAction<{ postId: string }>
): Generator<any, void, any> {
  const response = yield call(loadPost, action.payload.postId);

  yield put(postsSlice.actions.loadPostSuccess({ post: response }));

  if (response?.userId) {
    yield put(
      usersSlice.actions.loadUser({ userId: response.userId.toString() })
    );
  }
}

function* postsSaga() {
  yield takeEvery(postsSlice.actions.loadComments.type, loadCommentsSaga);
  yield takeEvery(postsSlice.actions.loadPost.type, loadPostSaga);
}

export default postsSaga;
