import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Suspense } from "react";
import { QuizList } from "./components/QuizList";
import {
  useModalActions,
  useModalState,
  useSelectedQuizActions,
} from "../../store";
import { CreateAndUpdateQuizForm } from "./components/CreateAndUpdateQuizForm";

export const QuizListPage = () => {
  const isDrawerOpen = useModalState();
  const { setQuiz } = useSelectedQuizActions();
  const { setIsDrawerOpen } = useModalActions();
  return (
    <Box
      sx={{ bgColor: "background.paper", position: "relative", height: "100%" }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <QuizList />
      </Suspense>
      <Fab
        sx={{ position: "absolute", bottom: 32, right: 32 }}
        onClick={() => {
          setQuiz(null);
          setIsDrawerOpen(true);
        }}
      >
        <AddIcon />
      </Fab>
      {/* 귀찮아서 DOM 날려서 데이터 초기화 */}
      {isDrawerOpen && (
        <CreateAndUpdateQuizForm
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        />
      )}
    </Box>
  );
};
