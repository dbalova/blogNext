import { render, screen } from '@testing-library/react';
import ArticlesList from '../ArticlesList';
import { ArticleData } from '../../../types/articleData.types';

jest.mock('../../ArticlesCard/ArticlesCard', () => {
  return function MockArticlesCard({ slug, title }: { slug: string; title: string }) {
    return <div data-testid={`article-${slug}`}>{title}</div>
  }
});

describe('ArticlesList', () => {

  const mockArticles : ArticleData[] = [
    {
      slug: 'test-1',
      title: 'Тестовая статья 1',
      date: '2024-01-01',
      description: 'Описание 1',
    },
    {
      slug: 'test-2',
      title: 'Тестовая статья 2',
      date: '2024-01-02',
      description: 'Описание 2',
    },
  ];

  test('рендерит все статьи', () => {
    render(<ArticlesList allArticlesData={mockArticles} />);
    expect(screen.getByTestId('article-test-1')).toBeInTheDocument();
    expect(screen.getByTestId('article-test-2')).toBeInTheDocument();
    expect(screen.getByText('Тестовая статья 1')).toBeInTheDocument();
    expect(screen.getByText('Тестовая статья 2')).toBeInTheDocument();
  });

});