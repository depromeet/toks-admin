import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { CreateQuizFormValues } from "../types";

export const useUpdateQuizMutation = () => {
  return useMutation({
    mutationFn: async ({
      quiz,
      id,
    }: {
      quiz: CreateQuizFormValues;
      id: number;
    }) => {
      return await http.patch(`/api/v1/admin/quizzes/${id}`, quiz);
    },
  });
};
