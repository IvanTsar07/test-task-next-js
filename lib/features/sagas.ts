import { spawn } from "redux-saga/effects";

import postsSaga from "./posts/sagas";
import usersSaga from "./users/sagas";

function* rootSaga() {
  yield spawn(postsSaga);
  yield spawn(usersSaga);
}

export default rootSaga;
