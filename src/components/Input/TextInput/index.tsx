import { ChangeEventHandler } from "react";

interface ITextInput {
  placeholder?: string;
  name?: string;
  title?: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const TextInput = ({
  placeholder = "This is a default placeholder",
  name = "This is a default name",
  title = "This is a default title",
  id = "This is a default id",
  onChange,
}: ITextInput) => (
  <input
    className="border-2 rounded-lg pl-1 w-full"
    type="text"
    placeholder={placeholder}
    name={name}
    title={title}
    id={id}
    onChange={onChange}
  />
);
