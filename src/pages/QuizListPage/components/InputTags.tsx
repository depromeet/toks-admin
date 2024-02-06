import { TextField, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Tags } from "./Tags";

export const InputTags = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const [tags, SetTags] = useState<string[]>(value);
  const tagRef = useRef<HTMLInputElement>(null);

  const handleDelete = (value: string) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
    onChange(newtags);
  };

  const handleOnSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tags.length <= 5 && tagRef.current) {
      e.preventDefault();
      SetTags([...tags, tagRef.current.value]);
      onChange([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  };

  useEffect(() => {
    SetTags(value);
  }, [value]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TextField
        onKeyDown={handleOnSubmit}
        inputRef={tagRef}
        fullWidth
        variant="standard"
        size="small"
        sx={{ margin: "1rem 0" }}
        margin="none"
        placeholder={"태그를 입력 후, 엔터를 눌러주세요.(선택)"}
        InputProps={{
          startAdornment: (
            <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
              {tags?.map((data, index) => {
                return (
                  <Tags data={data} handleDelete={handleDelete} key={index} />
                );
              })}
            </Box>
          ),
        }}
      />
    </Box>
  );
};
