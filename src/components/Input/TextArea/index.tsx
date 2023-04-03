import { ChangeEventHandler } from "react";

interface ITextArea {
  placeholder: string;
  rows: number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea = ({ placeholder, rows, onChange }: ITextArea) => (
  <textarea
    rows={rows}
    className="border-2 rounded-lg pl-1 pb-1 w-full resize-none"
    placeholder={placeholder}
    onChange={onChange}
  />
);
