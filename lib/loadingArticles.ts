import { ArticleData } from '../types/articleData.types';
import { PaginationInfo } from '../types/paginationInfo';

interface LoadingArticlesResult {
  articles: ArticleData[];
  pagination: PaginationInfo;
}

export async function loadingArticles(page: number = 1): Promise<LoadingArticlesResult> {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${url}/api/articles?page=${page}`);
  const data = await res.json();

  return {
    articles: data.articles || [],
    pagination: data.pagination || {
      currentPage: 1,
      totalPages: 1,
      totalArticles: 0,
      limit: 5,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };
}