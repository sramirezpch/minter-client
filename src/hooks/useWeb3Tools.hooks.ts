import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useWeb3Tools = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [alchemy, setAlchemy] = useState<Alchemy>();

  useEffect(() => {
    if (!global.window?.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_GOERLI,
    });

    setProvider(provider);
    setAlchemy(alchemy);
  }, []);

  return { provider, alchemy };
};
