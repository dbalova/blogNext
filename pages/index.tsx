import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/DefaultLayout/DefaultLayout';
import ArticlesList from '../components/ArticlesList/ArticlesList';
import Pagination from '../components/Pagination/Pagination';
import { ArticleData } from '@/types/articleData.types';
import { PaginationInfo } from '@/types/paginationInfo';
import { loadingArticles } from '@/lib/loadingArticles';

interface HomeProps {
  initialData: {
    articles: ArticleData[];
    pagination: PaginationInfo;
  }
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  try {
    const page = Number(query.page) || 1;
    const data = await loadingArticles(page);

    return {
      props: {
        initialData: data
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
            totalArticles: 0,
            limit: 5,
            hasNextPage: false,
            hasPrevPage: false,
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

  const prevPageRef = useRef<number>(initialData.pagination?.currentPage || 1);

  useEffect(() => {
    const page = router.query.page ? Number(router.query.page) : 1;
    
    if (page === prevPageRef.current) {
      return;
    }

    if (page === 1) {
      setArticles(initialData.articles);
      setPagination(initialData.pagination);
      prevPageRef.current = 1;
      return;
    }

    const loadArticles = async () => {
      try {
        const data = await loadingArticles(page);
        setArticles(data.articles);
        setPagination(data.pagination);
        prevPageRef.current = page;
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    };
    loadArticles();
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