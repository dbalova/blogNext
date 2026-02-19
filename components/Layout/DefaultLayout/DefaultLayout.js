import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import styles from './DefaultLayout.module.sass';

export default function Layout({ children }) {
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