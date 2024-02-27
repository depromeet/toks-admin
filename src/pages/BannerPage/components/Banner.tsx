import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { Banner as BannerType } from "../types";

export const Banner = ({
  imageUrl,
  isActive,
  onRemoveButtonClick,
  onToggleButtonClick,
  isPending,
}: BannerType & {
  onRemoveButtonClick: () => void;
  onToggleButtonClick: () => void;
  isPending: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          borderRadius: "12px",
        }}
      >
        <img
          src={imageUrl}
          style={{
            height: "auto",
            borderRadius: "12px",
            aspectRatio: "3 / 1",
            width: "100%",
            zIndex: 0,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={onToggleButtonClick}
              disabled={isPending}
            />
          }
          label="노출 여부"
        />
        <Button variant="contained" color="error" onClick={onRemoveButtonClick}>
          삭제
        </Button>
      </Box>
    </Box>
  );
};
