import { getArticleData } from '../../../lib/articles';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { slug } = req.query;
    const article = await getArticleData(slug);

    res.status(200).json({
      success: true,
      article
    });
  } catch (error) {
    console.error('API Error:', error);

    if (error.code === 'ENOENT') {
      return res.status(404).json({
        success: false,
        message: 'Статья не найдена'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Ошибка'
    });
  }
}