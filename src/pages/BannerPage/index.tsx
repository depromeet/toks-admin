import { Box, TextField } from "@mui/material";
import { CreateAndUpdateBannerForm } from "./components/CreateAndUpdateBannerForm";
import { BannerList } from "./components/BannerList";
import { Suspense, useDeferredValue, useState } from "react";

export const BannerPage = () => {
  const [fixedWidth, setFixedWidth] = useState(480);
  const defferedFixedWidth = useDeferredValue(fixedWidth);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "0 32px",
      }}
    >
      <Box sx={{ borderRight: "1px solid #e4e4e4", paddingRight: "32px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1>배너 관리</h1>
          <TextField
            type="number"
            value={fixedWidth}
            onChange={(e) => {
              const numberValue = Number(e.target.value);
              setFixedWidth(numberValue);
            }}
            placeholder="배너 너비"
            label="max: 480px, min: 320px"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Suspense fallback={<div>loading...</div>}>
          <BannerList width={defferedFixedWidth} />
        </Suspense>
      </Box>
      <CreateAndUpdateBannerForm />
    </Box>
  );
};
