import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserModel = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type UsersState = {
  isLoading: boolean;
  users: UserModel[];
};

export const initialUserstState: UsersState = {
  users: [],
  isLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUserstState,
  reducers: {
    loadUsers: (state, _) => {
      state.isLoading = true;
    },
    loadUsersSuccess: (
      state,
      action: PayloadAction<{ users: UserModel[] }>
    ) => {
      state.isLoading = false;
      console.log("REDUCER USERS >>>>>", action.payload.users);
      state.users = action.payload.users;
    },
    loadUsersFailed: (state, _) => {
      state.isLoading = false;
    },
  },
});
