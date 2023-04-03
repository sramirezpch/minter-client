import { ChangeEventHandler } from "react";

interface IFileInput {
  name: string;
  id: string;
  onChange: ChangeEventHandler;
}

export const FileInput = ({ name, id, onChange }: IFileInput) => {
  return <input type="file" name={name} id={id} onChange={onChange} />;
};
