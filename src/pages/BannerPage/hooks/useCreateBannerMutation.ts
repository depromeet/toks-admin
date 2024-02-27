import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { CreateBannerRequest } from "../types";

export const useCreateBannerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateBannerRequest) =>
      await http.post("/api/v1/admin/bottom-banners", body),
    onSuccess: () => {
      alert("생성에 성공했어요.");
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
    onError: () => {
      alert("생성에 실패했어요. 다시 시도해주세요.");
    },
  });
};
