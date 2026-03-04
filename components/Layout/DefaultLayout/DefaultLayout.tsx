import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import styles from './DefaultLayout.module.sass';
export interface LayoutProps {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header></Header>
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </div>
  );
}