import { FC } from "react";

interface IErrorMessage {
  errorMessage: string;
}

export const ErrorLabel: FC<Partial<IErrorMessage>> = ({ errorMessage }) => {
  return <span className="text-red-600 font-bold">{errorMessage}</span>;
};
