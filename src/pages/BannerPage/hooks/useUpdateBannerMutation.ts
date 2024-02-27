import { http } from "../../../utils/http";
import { Banner } from "./../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBannerMutation = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...body }: Banner) => {
      return await http.put(`/api/v1/admin/bottom-banners/${id}`, body);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });
};
