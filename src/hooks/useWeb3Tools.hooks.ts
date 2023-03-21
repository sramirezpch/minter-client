import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useWeb3Tools = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    if (!global.window?.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    setProvider(provider);
  }, []);

  return { provider };
};
