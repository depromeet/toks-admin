import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { Banner as BannerType } from "../types";

export const Banner = ({
  imageUrl,
  isActive,
  onRemoveButtonClick,
  onToggleButtonClick,
  isPending,
  seq,
  isSameSequence,
}: BannerType & {
  onRemoveButtonClick: () => void;
  onToggleButtonClick: () => void;
  isPending: boolean;
  isSameSequence: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
        border: isSameSequence ? "1px solid #ff0000" : "none",
      }}
    >
      {isSameSequence && (
        <Typography variant="body1" color="error">
          같은 순서에 배너가 있습니다.
        </Typography>
      )}
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

        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            {seq}번째 순서
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={onRemoveButtonClick}
          >
            삭제
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
