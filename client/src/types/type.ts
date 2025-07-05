export type TBook = {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  data?:[]
  pagination?:{}
};


export interface GetAllBooksParams {
  page?: number;
  limit?: number;
}

export interface TPagination {
  currentPage: number;
  totalpage: number;
  nextPage?: number;
  prevPage?: number;
}
