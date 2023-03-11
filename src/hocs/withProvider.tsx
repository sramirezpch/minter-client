import { FC, useEffect, useState } from "react";
import Web3Context from "../context/web3.context";

import { useAppDispatch, useWeb3Tools } from "../hooks";
import { IWrapped } from "../interfaces";

import { updateAccount } from "../redux/slices/account.reducer";

export const withProvider = (WrappedComponent: FC<IWrapped>) => {
  const EnhancedComponent: FC = (props) => {
    const { provider, alchemy } = useWeb3Tools();

    const dispatch = useAppDispatch();

    useEffect(() => {
      global.window?.ethereum.on(
        "accountsChanged",
        (accounts: Array<string>) => {
          console.log("Account changed!");
          dispatch(updateAccount(accounts[0]));
        }
      );
    }, []);

    useEffect(() => {
      (async () => {
        if (!provider) return;
        console.log("There is a provider!");
        const [account] = await provider.send("eth_requestAccounts", []);
        dispatch(updateAccount(account));
      })();
    }, [provider]);

    return (
      <Web3Context.Provider value={provider}>
        <WrappedComponent {...props} alchemy={alchemy} />
      </Web3Context.Provider>
    );
  };

  return EnhancedComponent;
};
