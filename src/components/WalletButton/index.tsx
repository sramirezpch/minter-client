import { FC, useContext } from "react";
import Web3Context from "../../context/web3.context";

const WalletButton: FC = () => {
  const provider = useContext(Web3Context);

  const connectWallet = async () => {
    console.log(provider);
    await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
  };

  return <button onClick={connectWallet}>Connect Wallet</button>;
};

export default WalletButton;
