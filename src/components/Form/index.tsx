import { ChangeEvent, FC, FormEvent, MouseEvent, useState } from "react";

import {
  mint,
  pinFileToPinata,
  seedFormData,
  isCorrectFileType,
} from "../../utils";

import { FormValues } from "../../interface";
import { Input } from "../Input";
import { Button } from "../Button";
import { ErrorLabel } from "../ErrorLabel";

export const Form: FC = () => {
  const [formValues, setFormValues] = useState<Partial<FormValues>>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
    }
    setFormValues({ ...formValues, [name]: files ? files[0] : value });
  };

  const handleSubmitForm = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const form = seedFormData(formValues);

    const hash = await pinFileToPinata(form);
    if (hash) await mint(hash);
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmitForm}>
      <div>
        <span className="block">
          <label htmlFor="title">Title</label>
        </span>
        <Input
          placeholder="Insert the name of your NFT"
          type="text"
          onChange={handleInputChange}
          name="title"
          id="title"
        />
      </div>
      <div>
        <span className="block">
          <label htmlFor="description">Description</label>
        </span>
        <Input
          placeholder="You can write here a brief description"
          type="textarea"
          rows={5}
          name="description"
          id="description"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Input type="file" name="file" id="file" onChange={handleInputChange} />
        {formValues.file && !isCorrectFileType(formValues.file.type) && (
          <ErrorLabel errorMessage="Invalid file type" />
        )}
      </div>
      <Button className="bg-blue-800" onClick={handleSubmitForm}>
        <span className="text-white">Mint NFT</span>
      </Button>
    </form>
  );
};
