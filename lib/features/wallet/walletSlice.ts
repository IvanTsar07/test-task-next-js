import { init } from "./../../../node_modules/i18next/index.d";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type WalletState = {
  account: string;
  balance: string;
  chainId: string;
  initialized: boolean;
};

export const initialWalletState: WalletState = {
  account: "",
  balance: "",
  chainId: "",

  initialized: false,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState: initialWalletState,
  reducers: {
    setWalletData: (state, action: PayloadAction<WalletState>) => {
      state.account = action.payload.account;
      state.balance = action.payload.balance;
      state.chainId = action.payload.chainId;
      state.initialized = true;
    },
    resetWalletState(state) {
      state.account = "";
      state.balance = "";
      state.chainId = "";
      state.initialized = false;
    },
  },
});
