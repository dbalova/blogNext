import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { ArticleData } from '@/types/articleData.types';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getArticlesData(): ArticleData[] {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData: ArticleData[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      description: matterResult.data.description || '',
    };
  });
  return allArticlesData;
}

export function getAllArticlesSlugs(): { params: { slug: string } }[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getArticleData(slug: string): Promise<ArticleData> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const content = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title || 'Без названия',
    date: matterResult.data.date || new Date().toISOString().split('T')[0],
    description: matterResult.data.description || '',
    content,
  };
}