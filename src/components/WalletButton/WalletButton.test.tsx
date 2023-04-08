import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { WalletButton } from ".";
import { UserWalletState, update } from "../../redux/slices/userWallet.slices";
import userWalletReducer from "../../redux/slices/userWallet.slices";

import { configureStore } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

type StoreInterface = {
  userWallet: UserWalletState;
};

const ethereum = {
  request: jest.fn(() => {
    return "0x35289c27f5C44D9809cBBEFb6fCA5EF7b98cF9D0";
  }),
};
Object.defineProperty(window, "ethereum", {
  value: ethereum,
});

describe("Wallet Button", () => {
  beforeEach(() => {
    ethereum.request.mockReturnValue(
      "0x35289c27f5C44D9809cBBEFb6fCA5EF7b98cF9D0"
    );
  });

  describe("UI updates", () => {
    const store = configureStore({
      reducer: {
        userWallet: userWalletReducer,
      },
    });

    beforeEach(() => {
      render(
        <Provider store={store}>
          <WalletButton />
        </Provider>
      );
    });
    it("shows the message 'Connect wallet'", () => {
      const button = screen.getByRole("button");

      expect(button.textContent).toBeDefined();
      expect(button.textContent).toEqual("Connect wallet");
    });
    it("updates the wallet button to show the address when the user connects its wallet", async () => {
      const button = screen.getByRole("button");

      await act(async () => {
        await userEvent.click(button);
      });

      const { userWallet } = store.getState();

      await waitFor(() => {
        expect(ethereum.request).toHaveBeenCalledTimes(1);
        expect(ethereum.request).toReturnWith(
          "0x35289c27f5C44D9809cBBEFb6fCA5EF7b98cF9D0"
        );
        expect(userWallet.address).toBeDefined();
        expect(userWallet.address).toBe(
          "0x35289c27f5C44D9809cBBEFb6fCA5EF7b98cF9D0"
        );
        expect(button.textContent).toBe(
          "0x35289c27f5C44D9809cBBEFb6fCA5EF7b98cF9D0"
        );
      });
    });
  });

  describe("Redux actions", () => {
    const initialState: UserWalletState = {
      address: undefined,
    };

    const mockStore = configureMockStore<StoreInterface>([]);
    const store = mockStore(() => ({
      userWallet: initialState,
    }));

    beforeEach(() => {
      render(
        <Provider store={store}>
          <WalletButton />
        </Provider>
      );
    });

    afterEach(() => {
      store.clearActions();
    });

    it("has no actions called", () => {
      const actions = store.getActions();

      expect(actions).toHaveLength(0);
    });

    it("dispatches update action", async () => {
      await act(async () => {
        await userEvent.click(screen.getByRole("button"));
      });

      const actions = store.getActions();

      screen.debug();
      expect(actions.length).toBeGreaterThan(0);
      expect(actions[0].type).toEqual("user wallet/update");
      expect(actions[0].payload).toEqual({
        address: "0x35289c27f5C44D9809cBBEFb6fCA5EF7b98cF9D0",
      });
    });
  });

  // describe("Rendering", () => {
  //   it.skip("has default state and no actions called", () => {
  //     const actions = store.getActions();
  //     const { userWallet } = store.getState();

  //     expect(userWallet).toEqual(initialState);
  //     expect(actions).toHaveLength(0);
  //   });

  //   it("renders the button correctly", () => {
  //     const { getByRole } = walletButton;

  //     const button = getByRole("button");
  //     expect(button).toBeInTheDocument();
  //     expect(within(button).getByText("Connect wallet")).toBeInTheDocument();
  //   });
  // });

  // describe("Component behavior", () => {
  //   it("updates the address", async () => {
  //     const expectedParams = {
  //       method: "eth_requestAccounts",
  //     };

  //     const button = screen.getByRole("button");

  //     fireEvent.click(button);

  //     await waitFor(() => {
  //       expect(store.getState().userWallet.address).toEqual(
  //         "0x35289c27f5C44D9809cBBEFb6fCA5EF7b98cF9D0"
  //       );
  //     });
  //     // expect(actions).toHaveLength(1);
  //     // expect(actions[0]).toEqual<{ type: string; payload: UserWalletState }>({
  //     //   type: "user wallet/update",
  //     //   payload: { address: "0x35289c27f5C44D9809cBBEFb6fCA5EF7b98cF9D0" },
  //     // });
  //     expect(window.ethereum.request).toHaveBeenCalledTimes(1);
  //     expect(window.ethereum.request).toHaveBeenCalledWith(expectedParams);
  //   });
  // });
});
