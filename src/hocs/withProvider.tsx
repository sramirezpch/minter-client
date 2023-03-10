import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";
import { FC, useEffect, useState } from "react";

import { useAppDispatch } from "../hooks";
import { IWrapped } from "../interfaces";

import { updateAccount } from "../redux/slices/account.reducer";

export const withProvider = (WrappedComponent: FC<IWrapped>) => {
  const EnhancedComponent: FC = (props) => {
    // const { provider, alchemy } = useWeb3Tools();
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
    const [alchemy, setAlchemy] = useState<Alchemy>();

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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const alchemy = new Alchemy({
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.ETH_GOERLI,
      });

      setProvider(provider);
      setAlchemy(alchemy);
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
      <WrappedComponent {...props} provider={provider} alchemy={alchemy} />
    );
  };

  return EnhancedComponent;
};
