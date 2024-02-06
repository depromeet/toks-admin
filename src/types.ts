export type Paginator<T> = {
  content: T[];
  page: number;
  size: number;
  totalCount: number;
  totalPage: number;
};
