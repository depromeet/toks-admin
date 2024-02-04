import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { DrawerCreateAndUpdateQuizForm } from "./components/DrawerCreateAndUpdateQuizForm";

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
      {/* 귀찮아서 DOM 날려서 데이터 초기화 */}
      {isOpenDrawer && (
        <DrawerCreateAndUpdateQuizForm
          open={isOpenDrawer}
          onClose={() => {
            setIsOpenDrawer(false);
          }}
        />
      )}
    </Box>
  );
};
