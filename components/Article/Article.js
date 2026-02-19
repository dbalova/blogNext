import Link from 'next/link';
import styles from './Article.module.sass';
export default function Article({ articleData }) {
    return (
        <>
            <article className={styles.article}>
                <Link className={styles.link} href="/">На главную</Link>
                <h1 className={styles.title}>{articleData.title}</h1>
                <div className={styles.date}>
                    {articleData.date}
                </div>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: articleData.content }} />
            </article>
        </>
    );
}
