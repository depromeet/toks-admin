import { useSuspenseQuery } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { BannerResponse } from "../types";

export const useBannersQuery = () => {
  return useSuspenseQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const page = 0;
      const size = 30;
      const searchParams = new URLSearchParams({
        page: String(page),
        size: String(size),
      }).toString();
      const { data } = await http.get<{
        data: BannerResponse;
      }>(`/api/v1/admin/bottom-banners?${searchParams}`);
      return data;
    },
    select: (data) => {
      const { content } = data;
      content.sort((a, b) => a.seq - b.seq);

      const sameSequenceCountList = content.reduce<number[]>(
        (acc, banner, index) => {
          if (index === 0) {
            return acc;
          }
          const prevBanner = content[index - 1];
          if (prevBanner.seq === banner.seq) {
            return [...acc, banner.seq];
          }
          return acc;
        },
        []
      );

      return {
        ...data,
        content,
        sameSequenceCountList,
      };
    },
  });
};
