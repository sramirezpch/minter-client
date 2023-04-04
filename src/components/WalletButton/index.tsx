import { FC, useContext } from "react";
import Web3Context from "../../context/web3.context";

import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { update } from "../../redux/slices/userWallet.slices";

export const WalletButton: FC = () => {
  const provider = useContext(Web3Context);
  const { address } = useAppSelector((state) => state.userWallet);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const address = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });

    dispatch(update({ address }));
  };

  return (
    <Button onClick={handleClick}>
      <span>{address ? address : "Connect wallet"}</span>
    </Button>
  );
};
