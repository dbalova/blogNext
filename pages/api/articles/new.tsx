import { ArticleData } from '@/types/articleData.types';
import { NextApiRequest, NextApiResponse } from 'next';

interface NewArticleResponse {
  success: boolean,
  message: string,
  article?: {
    slug: string,
    title: string,
    date: string,
    description: string
  content?: string
  }
}

export default function handler(req: NextApiRequest,
  res: NextApiResponse<NewArticleResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, 
      message: 'Method not allowed' });
  }

  try {
    const { title, content, slug, description, date } = req.body as ArticleData;
    if (!title || !content || !slug || !description || !date) {
      return res.status(400).json({
        success: false,
        message: 'Не все поля заполнены '
      });
    }

    console.log('Новая статья:');
    console.log('Slug:', slug);
    console.log('Title:', title);
    console.log('Date:', date);
    console.log('description:', description);
    console.log('content:', content);

    res.status(201).json({
      success: true,
      message: 'Статья успешно добавлена',
      article: {
        slug,
        title,
        date,
        description,
        content
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка'
    });
  }
}