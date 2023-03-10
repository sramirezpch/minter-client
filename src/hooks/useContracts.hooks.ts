import { ethers } from "ethers";
import { useEffect, useState } from "react";

import contractsAddresses from "../contracts.json";
interface HooksProps {
  provider?: ethers.providers.Web3Provider;
  nftAbi: string;
}

interface Contracts {
  nft?: ethers.Contract;
}

export const useContracts = ({ provider, nftAbi }: HooksProps) => {
  const [contracts, setContracts] = useState<Contracts>({
    nft: undefined,
  });

  const [signer, setSigner] = useState<ethers.Signer>();

  const initializeContracts = async () => {
    const contract = new ethers.Contract(
      contractsAddresses.nft,
      JSON.parse(nftAbi),
      signer
    );
    setContracts((prev) => ({ ...prev, nft: contract }));
  };
  useEffect(() => {
    if (!provider) return;
    const signer = provider.getSigner();
    setSigner(signer);

    (async () => {
      await initializeContracts();
    })();
  }, [provider]);

  return { contracts, signer };
};
