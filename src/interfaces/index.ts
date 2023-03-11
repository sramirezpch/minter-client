import { ethers } from "ethers";
import { Alchemy } from "alchemy-sdk";

export interface IWrapped {
  alchemy?: Alchemy;
}

export interface PinFilAxiosResponse {
  hash: string;
  message: string;
}
