import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { Quiz } from "../types";

export const useCreateQuizMutation = () => {
  return useMutation({
    mutationFn: async (quiz: Quiz) =>
      await http.post("/api/v1/admin/quizzes", quiz),
  });
};
