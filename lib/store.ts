import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSagas from "./features/sagas";

import { postsSlice } from "./features/posts/postsSlice";
import { walletSlice } from "./features/wallet/walletSlice";
import { usersSlice } from "./features/users/usersSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    wallet: walletSlice.reducer,
    users: usersSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSagas);

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
