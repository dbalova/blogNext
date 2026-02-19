export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, content, slug, description, date } = req.body;
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
        date: date,
        description: description,
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