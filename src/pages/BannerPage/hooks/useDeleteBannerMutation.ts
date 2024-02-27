import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../utils/http";

export const useDeleteBannerMutation = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return await http.delete(`api/v1/admin/bottom-banners/${id}`);
    },
    onSuccess: () => {
      alert("삭제에 성공했어요.");
      QueryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
    onError: () => {
      alert("삭제에 실패했어요. 다시 시도해주세요.");
    },
  });
};
