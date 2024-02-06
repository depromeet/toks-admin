import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { CreateQuizFormValues } from "../types";

export const useCreateQuizMutation = () => {
  return useMutation({
    mutationFn: async (quiz: CreateQuizFormValues) =>
      await http.post("/api/v1/admin/quizzes", quiz),
  });
};
