import Link from 'next/link';
import { useRouter } from 'next/router';
import { PaginationProps } from '../../types/pagination.types';
import styles from './Pagination.module.sass';

export default function Pagination({ currentPage, totalPages, basePath = '/' }: PaginationProps) {
    const router = useRouter();

    if (totalPages <= 1) return null;

    const createPageUrl = (page: number) => {
        if (page === 1) {
            return { pathname: basePath, query: {} };
        }
        const query = { ...router.query, page };
        return {
            pathname: basePath,
            query,
        };
    };

    return (
        <nav className={styles.pagination} aria-label="Навигация по страницам">
            {currentPage > 1 && (
                <Link href={createPageUrl(currentPage - 1)} className={styles.button}>
                    ←
                </Link>
            )}
            <ul className={styles.pagesList}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={styles.pagesItem}>
                        <Link
                            href={createPageUrl(page)}
                            className={`${styles.page} ${currentPage === page ? styles.active : ''}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </Link>
                    </li>
                ))}
            </ul>
            {currentPage < totalPages && (
                <Link href={createPageUrl(currentPage + 1)} className={styles.button}>
                    →
                </Link>
            )}
        </nav>
    );
}