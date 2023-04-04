import { FC, useEffect, useState } from "react";
import Web3Context from "../context/web3.context";
import { useAppDispatch, useWeb3Tools } from "../hooks/";
import { update } from "../redux/slices/userWallet.slices";

export const withProvider = (WrappedComponent: FC) => {
  const EnhancedComponent: FC = (props) => {
    const { provider } = useWeb3Tools();

    const dispatch = useAppDispatch();

    useEffect(() => {
      global.window?.ethereum.on(
        "accountsChanged",
        (accounts: Array<string>) => {
          const [account] = accounts;
          dispatch(update({ address: account }));
        }
      );
    }, []);

    useEffect(() => {
      (async () => {
        if (!provider) return;
        const [account] = await provider.send("eth_requestAccounts", []);
        dispatch(update({ address: account }));
      })();
    }, [provider]);

    return (
      <Web3Context.Provider value={provider}>
        <WrappedComponent {...props} />
      </Web3Context.Provider>
    );
  };

  return EnhancedComponent;
};
