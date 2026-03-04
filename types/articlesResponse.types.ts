import { ArticleData } from "./articleData.types";
import { PaginationInfo } from "./paginationInfo";

export interface ArticlesResponse {
  success: boolean,
  articles: ArticleData[],
  pagination: PaginationInfo
}