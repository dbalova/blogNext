import { getArticlesData } from '../../../lib/articles';

export default function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const articles = getArticlesData();

    res.status(200).json({
      success: true,
      articles: articles
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка'
    });
  }
}