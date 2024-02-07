import { Box, Button } from "@mui/material";
import { InputHTMLAttributes, forwardRef, useState } from "react";

export const UploadButton = forwardRef<
  HTMLInputElement,
  {
    label: string;
    temporaryImage?: string;
    value?: string | File;
  } & Omit<InputHTMLAttributes<HTMLInputElement>, "value">
>(
  (
    {
      label,
      value,
      onChange,
      temporaryImage,
      ...rest
    }: {
      value?: string | File;
      label: string;
      temporaryImage?: string;
    } & Omit<InputHTMLAttributes<HTMLInputElement>, "value">,
    ref
  ) => {
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setThumbnailUrl(e.target?.result as string);
        };
      }
      onChange?.(e);
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "200px",
            height: "200px",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        >
          {!thumbnailUrl && temporaryImage && (
            <img src={temporaryImage} alt="" />
          )}
          {thumbnailUrl && <img src={thumbnailUrl} alt="" />}
        </Box>
        <Button variant="contained" component="label">
          {label}
          <input
            type="file"
            hidden
            accept="image/*"
            {...rest}
            onChange={handleChange}
            ref={ref}
          />
        </Button>
      </Box>
    );
  }
);
