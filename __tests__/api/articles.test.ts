import handler from '../../pages/api/articles'
import { createServer } from 'http'
import request from 'supertest'
import { getArticlesData } from '../../lib/articles'

jest.mock('../../lib/articles', () => ({
  getArticlesData: jest.fn(),
}));

describe('GET /api/articles', () => {
  const server = createServer((req, res) => {

    const url = new URL(req.url!, `http://localhost`);
    (req as any).query = Object.fromEntries(url.searchParams);

    const nextRes = res as any;
    nextRes.status = (code: number) => {
      res.statusCode = code;
      return nextRes;
    };
    nextRes.json = (data: any) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return nextRes;
    };

    handler(req as any, nextRes);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  })
  test('возвращает список статей с пагинацией', async () => {
    const mockArticles = [
      { slug: 'article-1', title: 'Статья 1', date: '2024-01-01', description: 'какой-то текст' },
      { slug: 'article-2', title: 'Статья 2', date: '2024-01-02', description: 'какой-то текст' },
      { slug: 'article-3', title: 'Статья 3', date: '2024-01-03', description: 'какой-то текст' },
      { slug: 'article-4', title: 'Статья 4', date: '2024-01-04', description: 'какой-то текст' },
      { slug: 'article-5', title: 'Статья 5', date: '2024-01-05', description: 'какой-то текст' },
    ];

    (getArticlesData as jest.Mock).mockReturnValue(mockArticles);

    const response = await request(server)
      .get('/api/articles')
      .query({ page: '1', limit: '2' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.articles).toHaveLength(2);
    expect(response.body.pagination).toEqual({
      currentPage: 1,
      totalPages: 3,
      totalArticles: 5,
      limit: 2,
      hasNextPage: true,
      hasPrevPage: false,
    });
  });
});