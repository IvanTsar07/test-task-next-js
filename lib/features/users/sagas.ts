import { loadUsers } from "@/lib/api/users";
import { call, put, takeLatest } from "redux-saga/effects";
import { usersSlice } from "./usersSlice";

function* loadUsersSaga(): Generator<any, void, any> {
  const response = yield call(loadUsers);

  yield put(usersSlice.actions.loadUsersSuccess({ users: response }));
}

function* usersSaga() {
  yield takeLatest(usersSlice.actions.loadUsers.type, loadUsersSaga);
}

export default usersSaga;
