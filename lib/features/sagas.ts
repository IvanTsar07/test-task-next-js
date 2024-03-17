import { call, put, spawn, takeEvery, takeLatest } from "redux-saga/effects";
import { postsSlice } from "./posts/postsSlice";
import { loadComments } from "../api/posts";
import { PayloadAction } from "@reduxjs/toolkit";
import { usersSlice } from "./users/usersSlice";
import { loadUsers } from "../api/users";

function* loadCommentsSaga(
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

function* loadUsersSaga(): Generator<any, void, any> {
  const response = yield call(loadUsers);

  yield put(usersSlice.actions.loadUsersSuccess({ users: response }));
}

function* postsSaga() {
  yield takeEvery(postsSlice.actions.loadComments.type, loadCommentsSaga);
}

function* usersSaga() {
  yield takeLatest(usersSlice.actions.loadUsers.type, loadUsersSaga);
}

function* rootSaga() {
  yield spawn(postsSaga);
  yield spawn(usersSaga);
}

export default rootSaga;
