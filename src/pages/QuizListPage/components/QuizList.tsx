import { useState } from "react";
import { useQuizListQuery } from "../hooks/useQuizListQuery";
import { Box, Pagination } from "@mui/material";
import { QuizCard } from "./QuizCard";
import { useModalActions, useSelectedQuizActions } from "../../../store";
import { Quiz } from "../types";
import { useRemoveQuizMutation } from "../hooks/useRemoveQuizMutation";

export const QuizList = () => {
  const [page, setPage] = useState(0);
  const { setIsDrawerOpen } = useModalActions();
  const { setQuiz } = useSelectedQuizActions();
  const { mutateAsync: removeQuiz } = useRemoveQuizMutation();

  const { data: pagination } = useQuizListQuery({
    page,
    pageSize: 8,
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handleEdit = (
    quiz: Quiz & {
      id: number;
    }
  ) => {
    setIsDrawerOpen(true);
    setQuiz(quiz);
  };

  const handleDelete = (quizId: number) => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) {
      return;
    }
    removeQuiz(quizId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "1280px",
        }}
      >
        {pagination.content?.map((quiz) => (
          <QuizCard
            key={quiz.id}
            {...quiz}
            onEdit={() => handleEdit(quiz)}
            onDelete={() => handleDelete(quiz.id)}
          />
        ))}
      </Box>
      <Pagination
        count={pagination.totalPage}
        page={page + 1}
        onChange={handleChange}
      />
    </Box>
  );
};
