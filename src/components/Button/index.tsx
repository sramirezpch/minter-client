import React, { MouseEventHandler } from "react";

interface IButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: JSX.Element;
}

export const Button = ({ onClick, className = "", children }: IButton) => {
  return (
    <button className={`rounded-lg px-4 py-1 ${className}`}>{children}</button>
  );
};
