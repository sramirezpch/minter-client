import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserWalletState {
  address?: string;
}

const initialState: UserWalletState = {
  address: undefined,
};

export const userWalletSlice = createSlice({
  name: "user wallet",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UserWalletState>) => {
      const { address } = action.payload;

      state.address = address;
    },
  },
});

export const { update } = userWalletSlice.actions;

export default userWalletSlice.reducer;
