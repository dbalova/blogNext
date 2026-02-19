import Head from 'next/head';
import Layout from '../components/Layout/DefaultLayout/DefaultLayout';
import { getArticlesData } from '../lib/articles';
import ArticlesList from '../components/ArticlesList/ArticlesList';


export async function getStaticProps() {
  const allArticlesData = getArticlesData();
  return {
    props: {
      allArticlesData,
    },
  };
}
export default function Home({ allArticlesData }) {
  return (
    <Layout>
      <Head>
        <title>Blog Website</title>
        <link rel="icon" href="/images/book.svg" />
        <meta name="description" content="blog" />
      </Head>
      <ArticlesList allArticlesData={allArticlesData}></ArticlesList>
    </Layout>
  );
}