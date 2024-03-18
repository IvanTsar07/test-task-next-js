import { loadUser, loadUsers } from "@/lib/api/users";
import { call, put, takeLatest } from "redux-saga/effects";
import { usersSlice } from "./usersSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* loadUsersSaga(): Generator<any, void, any> {
  const response = yield call(loadUsers);

  yield put(usersSlice.actions.loadUsersSuccess({ users: response }));
}

function* loadUserSaga(
  action: PayloadAction<{ userId: string }>
): Generator<any, void, any> {
  const response = yield call(loadUser, action.payload.userId);

  yield put(usersSlice.actions.loadUserSuccess({ user: response }));
}

function* usersSaga() {
  yield takeLatest(usersSlice.actions.loadUsers.type, loadUsersSaga);
  yield takeLatest(usersSlice.actions.loadUser.type, loadUserSaga);
}

export default usersSaga;
