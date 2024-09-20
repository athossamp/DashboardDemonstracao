import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import s from "./SelectMenu.module.css";
import { SelectMenuProps } from "../../../types/UI/selectMenu";

export default function SelectMenu(props: SelectMenuProps) {
  return (
    <div className={s.selectMenu}>
      <FormControl fullWidth>
        <InputLabel style={{ color: "#838896" }}>{props.labelProps}</InputLabel>
        <Select
          MenuProps={{
            style: {
              maxHeight: "300px",
            },
          }}
          sx={props.sx}
          className={s.selectMenuSelect}
          label={props.labelProps}
          name={props.nome}
          defaultValue=""
          onChange={props.changeHandler}>
          {props.itemMenu.map((item, index) => (
            <MenuItem
              sx={{ maxHeight: "300px" }}
              key={index}
              value={item.itemValue}
              onClick={() =>
                props.onClickProps && props.onClickProps(item.itemValue)
              }>
              {item.itemName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
