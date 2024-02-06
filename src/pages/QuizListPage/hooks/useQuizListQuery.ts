import { useSuspenseQuery } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { Paginator } from "../../../types";
import { Quiz } from "../types";

export type ResponseQuizList = Paginator<
  Quiz & {
    id: number;
  }
>;

export const useQuizListQuery = ({
  page = 0,
  pageSize = 15,
}: {
  page?: number;
  pageSize?: number;
}) => {
  return useSuspenseQuery({
    queryKey: ["quizList", page, pageSize],
    queryFn: async () => {
      const queryParams: Record<string, string> = {};
      queryParams["page"] = String(page);
      queryParams["size"] = String(pageSize);
      const searchParams = new URLSearchParams(queryParams).toString();
      const { data } = await http.get<{ data: ResponseQuizList }>(
        `/api/v1/admin/quizzes?${searchParams}`
      );
      return data;
    },
  });
};
