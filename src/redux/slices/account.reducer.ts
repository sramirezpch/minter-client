import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  address?: string;
  balance?: string;
  transactions?: number;
}

const initialState: AccountState = {
  address: undefined,
  balance: undefined,
  transactions: undefined,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountState>) => {
      const { payload } = action;
      return {
        ...state,
        address: payload.address,
        balance: payload.balance,
        transactions: payload.transactions,
      };
    },
    updateAccount: (state, action: PayloadAction<string>) => {
      return { ...state, address: action.payload };
    },
  },
});

export const { setAccount, updateAccount } = accountSlice.actions;

export default accountSlice.reducer;
