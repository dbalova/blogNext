import Layout from '../../components/Layout/DefaultLayout/DefaultLayout';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Article from '../../components/Article/Article';
import { ArticleData } from '@/types/articleData.types';


interface ArticlePageProps {
  articleData: ArticleData
}

export default function ArticlePage({ articleData }: ArticlePageProps) {
  return (
    <Layout >
      <Head>
        <title>{articleData.title}</title>
        <meta name="description" content={articleData.description} />
      </Head>
      <Article articleData={articleData} ></Article>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ArticlePageProps> = async ({ params }) => {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${url}/api/articles/${params!.slug}`);
    const data = await res.json();

    if (!data.success) {
      return { notFound: true };
    }
    return {
      props: {
        articleData: data.article,
      },
    };
  } catch (error) {
    console.error('Ошибка:', error);
    return {
      notFound: true,
    };
  }
}