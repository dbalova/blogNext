import Layout from '../../components/Layout/DefaultLayout/DefaultLayout';
import Head from 'next/head';
import { getArticleData } from '../../lib/articles';
import Article from '../../components/Article/Article';

export default function ArticlePage({ articleData }) {

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


export async function getServerSideProps({ params }) {
  try {
    const articleData = await getArticleData(params.slug);
    return {
      props: {
        articleData,
      },
    };
  } catch (error) {
    console.error('Ошибка:', error);

    return {
      notFound: true,
    };
  }
}