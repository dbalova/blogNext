import Link from 'next/link';
import { ArticleData } from '../../types/articleData.types';
import styles from './ArticlesCard.module.sass';

export default function ArticlesCard({ slug, date, title, description }: ArticleData) {
    return (
        <li className={styles.item}>
            <Link href={`/articles/${slug}`}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>
                    {description}
                </div>
                <div className={styles.date}>
                    {date}
                </div>
            </Link>
        </li>
    );
}