import { FC, useEffect, useState } from "react";
import Web3Context from "../context/web3.context";
import { useWeb3Tools } from "../hooks/";

export const withProvider = (WrappedComponent: FC) => {
  const EnhancedComponent: FC = (props) => {
    const { provider } = useWeb3Tools();

    useEffect(() => {
      global.window?.ethereum.on(
        "accountsChanged",
        (accounts: Array<string>) => {
          console.log("Account changed!");
        }
      );
    }, []);

    useEffect(() => {
      (async () => {
        if (!provider) return;
        const [account] = await provider.send("eth_requestAccounts", []);
        console.log(account);
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
