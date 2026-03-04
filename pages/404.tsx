import Link from 'next/link';
import Layout from '../components/Layout/DefaultLayout/DefaultLayout';
import styles from '../styles/404.module.sass';

export default function Page404() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Страница не найдена</h2>
        <Link className={styles.link} href="/">На главную</Link>
      </div>
    </Layout>
  );
}