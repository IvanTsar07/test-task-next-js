import { loadComments } from "@/lib/api/posts";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { postsSlice } from "./postsSlice";

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

function* postsSaga() {
  yield takeEvery(postsSlice.actions.loadComments.type, loadCommentsSaga);
}

export default postsSaga;
