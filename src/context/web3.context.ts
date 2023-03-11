import { ethers } from "ethers";
import { createContext } from "react";

const Web3Context = createContext<ethers.providers.Web3Provider | undefined>(
  undefined
);

export default Web3Context;
