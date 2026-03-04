import { NextApiRequest, NextApiResponse } from 'next'
import { getArticleData } from '../../../lib/articles';
import { ArticleData } from '@/types/articleData.types';

export interface ArticleResponse {
  success: boolean
  article?: ArticleData
}
export default async function handler(req: NextApiRequest,
  res: NextApiResponse<ArticleResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false
    });
  }

  try {
    const { slug } = req.query;
    const article = await getArticleData(slug as string);

    res.status(200).json({
      success: true,
      article
    });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.code === 'ENOENT') {
      return res.status(404).json({
        success: false,
      });
    }
    res.status(500).json({
      success: false,
    });
  }
}