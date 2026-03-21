import { getArticlesData } from '../../../lib/articles';
import { NextApiRequest, NextApiResponse } from 'next';
import { PaginationInfo } from '@/types/paginationInfo';
import { ArticlesResponse } from '@/types/articlesResponse.types';

const validPage = (page: unknown): number => {
  const num = Number(page);
  if (isNaN(num) || num < 1) {
    return 1;
  }
  return num;
};

const validLimit = (limit: unknown): number => {
  const num = Number(limit);
  if (isNaN(num) || num <= 0) {
    return 5;
  }
  return num;
};


export default function handler(req: NextApiRequest,
  res: NextApiResponse<ArticlesResponse>) {

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      articles: [],
      pagination: {} as PaginationInfo
    });
  }

  try {
    const page = validPage(req.query.page);
    const limit = validLimit(req.query.limit);

    const articles = getArticlesData();
    const totalPages = Math.ceil(articles.length / limit);

    if (page > totalPages) {
      return res.status(200).json({
        success: true,
        articles: [],
        pagination: {
          currentPage: page,
          totalPages,
          totalArticles: 0,
          limit,
          hasNextPage: false,
          hasPrevPage: true,
        },
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedArticles = articles.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      articles: paginatedArticles,
      pagination: {
        currentPage: page,
        totalPages,
        totalArticles: articles.length,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      articles: [],
      pagination: {} as PaginationInfo
    });
  }
}