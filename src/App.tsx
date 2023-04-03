import { ethers } from "ethers";
import React, { useContext } from "react";

import { Form } from "./components/Form";

import Web3Context from "./context/web3.context";

export const MintPage: React.FC = () => {
  const provider = useContext(Web3Context);

  return (
    <div className="flex flex-col p-3">
      <div className="w-1/2 m-auto mt-2">
        <Form />
      </div>
    </div>
  );
};
