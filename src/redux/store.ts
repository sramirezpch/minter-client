import { configureStore } from "@reduxjs/toolkit";

import userWalletReducer from "./slices/userWallet.slices";

export const store = configureStore({
  reducer: {
    userWallet: userWalletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
