import Link from 'next/link';
import styles from './ArticlesCard.module.sass';
export default function ArticlesCard(props) {
    const {
        slug,
        date,
        title,
        description
    } = props;
    return (
        <Link href={`/articles/${slug}`}>
            <li className={styles.item} key={slug}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>
                    {description}
                </div>
                <div className={styles.date}>
                    {date}
                </div>
            </li></Link>
    );
}