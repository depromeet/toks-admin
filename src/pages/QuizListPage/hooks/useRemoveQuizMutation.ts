import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../utils/http";

export const useRemoveQuizMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return await http.delete(`/api/v1/admin/quizzes?ids=${id}`);
    },
    onSuccess: () => {
      alert("퀴즈가 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["quizList"],
      });
    },
  });
};
