import { ethers } from "ethers";
import type { NextPage } from "next";
import { useRef } from "react";

import { withProvider } from "../../src/hocs";
import { IWrapped } from "../../src/interfaces";

const TransactionPage: NextPage<IWrapped> = ({ provider }) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const walletAddressRef = useRef<HTMLInputElement>(null);

  const executeTransaction = async (e: any) => {
    e.preventDefault();
    if (!provider) return;
    const signer = provider.getSigner();

    const value: string = amountRef.current?.value || "";

    const tx = await signer.sendTransaction({
      to: walletAddressRef.current?.value,
      value: ethers.utils.parseEther(value),
    });

    await tx.wait();
  };

  return (
    <div className="w-full pt-2 flex" style={{ height: "calc(100vh - 64px)" }}>
      <div className="m-auto w-1/2">
        <form className="bg-zinc-200 p-3 flex flex-col gap-y-3 rounded-lg">
          <label className="flex flex-col gap-y-px">
            <span>Type the amount in ETH to send</span>
            <input
              className="border-2 rounded-lg px-1 w-full h-9"
              ref={amountRef}
            />
          </label>
          <label className="flex flex-col gap-y-px">
            <span>Paste the wallet address to send the ETH</span>
            <input
              className="border-2 rounded-lg px-1 w-full h-9"
              ref={walletAddressRef}
            />
          </label>
          <div>
            <button
              className="border-2 rounded-lg bg-white px-4 py-1.5"
              onClick={executeTransaction}
            >
              Send ETH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withProvider(TransactionPage);
