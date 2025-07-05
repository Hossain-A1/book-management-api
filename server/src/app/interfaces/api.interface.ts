export interface TPagination {
  totalpage: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalNumberOfProducts: number;
}

export interface TApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  pagination?: TPagination;
}
