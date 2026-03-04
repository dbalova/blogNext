import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/DefaultLayout/DefaultLayout';
import ArticlesList from '../components/ArticlesList/ArticlesList';
import Pagination from '../components/Pagination/Pagination';
import { ArticleData } from '@/types/articleData.types';
import { PaginationInfo } from '@/types/paginationInfo';

interface HomeProps {
  initialData: {
    articles: ArticleData[]
    pagination: PaginationInfo
  }
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  try {
    const page = query.page || 1;
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${url}/api/articles?page=${page}`);
    const data = await res.json();

    return {
      props: {
        initialData: {
          articles: data.articles || [],
          pagination: data.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalArticles: 0
          }
        }
      },
    };
  } catch (error) {
    console.error('Ошибка:', error);
    return {
      props: {
        initialData: {
          articles: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalArticles: 0
          }
        }
      },
    };
  }
}
export default function Home({ initialData }: HomeProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleData[]>(initialData.articles || []);
  const [pagination, setPagination] = useState<PaginationInfo>(initialData.pagination || {});

  useEffect(() => {
    const loadArticles = async () => {
      const page = router.query.page || 1;

      try {
        const url = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${url}/api/articles?page=${page}`);
        const data = await res.json();

        if (data.success) {
          setArticles(data.articles);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    };
    if (router.query.page) {
      loadArticles();
    }
  }, [router.query.page]);

  return (
    <Layout>
      <Head>
        <title>Blog Website</title>
        <link rel="icon" href="/images/book.svg" />
        <meta name="description" content="blog" />
      </Head>
      <ArticlesList allArticlesData={articles} />
      <Pagination
        currentPage={pagination.currentPage || 1}
        totalPages={pagination.totalPages || 1}
      />
    </Layout>
  );
}