import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { CATEGORIES } from "../constants";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export const SelectCategory = ({
  value,
  onChange,
  name,
}: {
  value: string;
  onChange: (value: string) => void;
  name: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "16px",
      }}
    >
      <InputLabel id="category-select">카테고리 선택</InputLabel>
      <Select
        sx={{ width: "100%", color: "text.primary" }}
        name={name}
        labelId="category-select"
        value={value}
        label="카테고리 선택"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {CATEGORIES.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
