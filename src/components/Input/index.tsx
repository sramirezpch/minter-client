import { ChangeEventHandler } from "react";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import { FileInput } from "./FileInput";
interface IInput {
  placeholder?: string;
  type: string;
  rows?: number;
  name: string;
  id: string;
  onChange: ChangeEventHandler;
}

export const Input = ({
  placeholder,
  type,
  name,
  onChange,
  id,
  rows = 0,
}: IInput) => {
  switch (type) {
    case "textarea":
      return (
        <TextArea placeholder={placeholder!} onChange={onChange} rows={rows} />
      );
    case "text":
      return (
        <TextInput
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={onChange}
        />
      );
    case "file":
      return <FileInput name={name} id={id} onChange={onChange} />;
    default:
      return <TextInput />;
  }
};
