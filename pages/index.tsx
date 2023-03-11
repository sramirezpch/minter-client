import type { NextPage } from "next";
import axios from "axios";

import NftAbi from "../src/abi/NFT.json";
import contracts from "../src/contracts.json";

import { IWrapped } from "../src/interfaces";
import { withProvider } from "../src/hocs";
import { ethers } from "ethers";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

const MintPage: NextPage<IWrapped> = ({ provider }) => {
  const [file, setFile] = useState<any>();
  const [formValues, setFormValues] = useState<any>({});

  const seedFormData = (form: FormData) => {
    form.append("file", file);

    return new Promise((resolve) => {
      Object.keys(formValues).forEach((key) => {
        form.append(key, formValues[key]);
      });

      console.log("Finished seeding formData");

      resolve(form);
    });
  };

  const pinFileToPinata = async (formData: FormData) => {
    try {
      const {
        data: { ipfs_hash },
      } = await axios.post("http://localhost:8080/pin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Metadata pinned successfully!");

      return ipfs_hash;
    } catch (err) {
      console.log(err);
    }
  };

  const mint = async (hash: string) => {
    const nft = new ethers.Contract(
      contracts.nft,
      NftAbi.abi,
      provider?.getSigner()
    );

    try {
      const tx = await nft.safeMint(
        await provider?.getSigner().getAddress(),
        `https://gateway.pinata.cloud/ipfs/${hash}`
      );

      await tx.wait();
      console.log("NFT minted successfully!");
    } catch (error) {
      console.log(error);
      if (hash) {
        await axios.delete(`http://localhost:8080/unpin/${hash}`);
        console.log("Metadata unpinned successfully!");
      }
    }
  };

  const mintNft = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const formData = new FormData();

    await seedFormData(formData);

    const hash = await pinFileToPinata(formData);
    if (hash) await mint(hash);
  };

  return (
    <div className="flex flex-col p-3">
      <div className="w-1/2 m-auto mt-2">
        <form className="flex flex-col gap-y-2" onSubmit={mintNft}>
          <div>
            <span className="block">
              <label htmlFor="title">Title</label>
            </span>
            <input
              placeholder="Insert the name of your NFT"
              className="border-2 rounded-lg pl-1 w-full"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormValues((prev: any) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="title"
              id="title"
            />
          </div>
          <div>
            <span className="block">
              <label htmlFor="description">Description</label>
            </span>
            <textarea
              className="border-2 rounded-lg pl-1 pb-1 w-full resize-none"
              rows={5}
              placeholder="You can write here a brief description"
              name="description"
              id="description"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setFormValues((prev: any) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <input type="file" onChange={(e) => setFile(e.target.files![0])} />
          <button
            onClick={mintNft}
            className="bg-blue-800 text-white rounded-lg px-4 py-1"
          >
            Mint NFT
          </button>
        </form>
      </div>
    </div>
  );
};

export default withProvider(MintPage);
