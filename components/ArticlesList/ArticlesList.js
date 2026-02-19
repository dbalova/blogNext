import styles from './ArticlesList.module.sass';
import ArticlesCard from '../ArticlesCard/ArticlesCard';

export default function ArticlesList({ allArticlesData }) {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Список статей</h2>
            <ul className={styles.list}>
                {allArticlesData.map(({ slug, date, title, description }) => (
                    <ArticlesCard
                        slug={slug}
                        date={date}
                        title={title}
                        description={description} >
                    </ArticlesCard>
                ))}
            </ul>
        </section>
    );
}


