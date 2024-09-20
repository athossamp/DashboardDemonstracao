import { SelectChangeEvent, SxProps, Theme } from "@mui/material";

export type SelectMenuProps = {
  itemMenu: {
    itemName: number | string;
    itemValue: number | string;
  }[];
  nome: string;
  changeHandler?: (
    event: SelectChangeEvent<string>
  ) => void | React.ChangeEvent<HTMLSelectElement>;
  onClickProps?: (value: number | string) => void;
  valor?: number[] | number | string;
  labelProps?: string;
  sx?: SxProps<Theme>;
};
