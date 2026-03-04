import Link from 'next/link';
import styles from './Header.module.sass';

interface HeaderProps {
  siteTitle?: string
}

export default function Header({ siteTitle = "Articles" }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/">
          {siteTitle}
        </Link>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            <li className="item">
              <Link href="/" className={styles.link}>Главная</Link>
            </li>
            <li className="item">
              <Link href="/admin?admin=true" className={styles.link}>Админка</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}