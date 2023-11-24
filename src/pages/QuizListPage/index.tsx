import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { DrawerCreateQuizForm } from "./components/DrawerCreateQuizForm";

export const QuizListPage = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <Box
      sx={{ bgColor: "background.paper", position: "relative", height: "100%" }}
    >
      <Fab
        sx={{ position: "absolute", bottom: 32, right: 32 }}
        onClick={() => {
          setIsOpenDrawer(true);
        }}
      >
        <AddIcon />
      </Fab>
      <DrawerCreateQuizForm
        open={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
      />
    </Box>
  );
};
