import { Cancel } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

export const Tags = ({
  data,
  handleDelete,
}: {
  data: string;
  handleDelete: (value: string) => void;
}) => {
  return (
    <Box
      sx={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          {data}
        </Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};
