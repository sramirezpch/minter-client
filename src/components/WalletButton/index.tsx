import { FC, useContext } from "react";
import Web3Context from "../../context/web3.context";

import { Button } from "../Button";

export const WalletButton: FC = () => {
  // const provider = useContext(Web3Context);

  const handleClick = async () => {
    await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
  };

  return (
    <Button onClick={handleClick}>
      <span>Connect Wallet</span>
    </Button>
  );
};
