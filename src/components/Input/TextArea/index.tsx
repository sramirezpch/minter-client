import { ChangeEventHandler } from "react";

interface ITextArea {
  placeholder: string;
  rows: number;
  name: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea = ({ placeholder, rows, name, onChange }: ITextArea) => (
  <textarea
    rows={rows}
    name={name}
    className="border-2 rounded-lg pl-1 pb-1 w-full resize-none"
    placeholder={placeholder}
    onChange={onChange}
  />
);
