import { ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect } from "react";

import { useAppDispatch } from "../src/hooks/useAppDispatch.hooks";
import { useAppSelector } from "../src/hooks/useAppSelector.hooks";

import { setAccount } from "../src/redux/slices/account.reducer";

import { withProvider } from "../src/hocs";
import { IWrapped } from "../src/interfaces";

const Home: NextPage<IWrapped> = ({ provider }) => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!provider) {
        return;
      }
      try {
        const [account] = await provider.send("eth_requestAccounts", []);
        const balance = ethers.utils
          .parseEther((await provider.getBalance(account)).toString())
          .toString();
        console.log(account);
        const transactions = await provider?.getTransactionCount(account);

        dispatch(
          setAccount({ address: account as string, balance, transactions })
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [provider]);

  const requestAccount = async () => {
    console.log("Requesting account");
  };

  return (
    <div className="flex justify-between items-center p-3">
      <button
        className="border-2 rounded-lg px-3 py-1 bg-white"
        onClick={requestAccount}
      >
        Connect wallet
      </button>
      <span className="text-black">{account.address}</span>
    </div>
  );
};

export default withProvider(Home);
