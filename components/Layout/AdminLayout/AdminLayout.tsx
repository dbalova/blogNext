import Head from 'next/head';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import styles from './AdminLayout.module.sass';
export interface AdminLayoutProps {
  children: React.ReactNode
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Админ-панель</title>
        <meta name="description" content="Админ-панель" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Header siteTitle="Админ-панель"></Header>
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}