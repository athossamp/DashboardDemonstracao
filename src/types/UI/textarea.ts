import { ChangeEventHandler } from "react";

export type TextareaProps = {
  nome: string;
  placeholder: string;
  inputValue: string | number | readonly string[] | undefined;
  classNameProps?: string;
  onChangeHandler?: ChangeEventHandler<HTMLTextAreaElement>;
};
