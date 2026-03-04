import { getArticlesData } from '../../../lib/articles';
import { NextApiRequest, NextApiResponse } from 'next';
import { PaginationInfo } from '@/types/paginationInfo';
import { ArticlesResponse } from '@/types/articlesResponse.types';

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

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const articles = getArticlesData();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedArticles = articles.slice(startIndex, endIndex);

    const totalPages = Math.ceil(articles.length / limit);

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