import ArticlesCard from '../ArticlesCard/ArticlesCard';
import { ArticleData } from '../../types/articleData.types';
import styles from './ArticlesList.module.sass';


export interface ArticlesListProps {
    allArticlesData: ArticleData[]
}

export default function ArticlesList({ allArticlesData = [] }: ArticlesListProps) {
    if (allArticlesData.length === 0) {
        return (
            <section className={styles.container}>
                <h2 className={styles.title}>Список статей</h2>
                <div>
                    Пока нет статей.
                </div>
            </section>
        );
    }
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Список статей</h2>
            <ul className={styles.list}>
                {allArticlesData.map(({ slug, date, title, description }) => (
                    <ArticlesCard
                        key={slug}
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




