import axios from "axios";

import { FormValues } from "../interface";

export const seedFormData = ({
  title,
  description,
  file,
}: Partial<FormValues>) => {
  const form = new FormData();
  form.append("File:", file!);

  form.append("Title:", title!);
  form.append("Description", description!);

  return form;
};

export const pinFileToPinata = async (formData: FormData) => {
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

export const mint = async (hash: string) => {
  // const nft = new ethers.Contract(
  //   addresses.development.nft,
  //   abi.nft.abi,
  //   provider?.getSigner()
  // );
  // try {
  //   const tx = await nft.safeMint(
  //     await provider?.getSigner().getAddress(),
  //     `https://gateway.pinata.cloud/ipfs/${hash}`
  //   );
  //   await tx.wait();
  //   console.log("NFT minted successfully!");
  // } catch (error) {
  //   console.log(error);
  //   if (hash) {
  //     await axios.delete(`http://localhost:8080/unpin/${hash}`);
  //     console.log("Metadata unpinned successfully!");
  //   }
  // }
};

export const isCorrectFileType = (type: string) => {
  const correctFileTypes = ["image/png", "image/jpg", "image/jpeg"];
  return type in correctFileTypes;
};
