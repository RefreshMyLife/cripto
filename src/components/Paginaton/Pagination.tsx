import React, { FC } from 'react';
import styles from './Pagination.module.scss';
import { Link } from 'react-router-dom';
const Pagination: FC<{
    allPages: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ allPages, currentPage, setCurrentPage }) => {
    const getBtn = () => {
        const btns = [];

        for (let index = 1; index <= allPages; index++) {
            btns.push(
                <Link
                    to="/"
                    key={index}
                    className={`${styles.link} ${currentPage === index ? styles.active : ''}`}
                    onClick={() => setCurrentPage(index)}>
                    {index}
                </Link>,
            );
        }

        return btns;
    };
    return (
        <div className={styles.pagination__container}>
            <Link
                to="/"
                className={`${styles.link} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={() => setCurrentPage((prev: number) => (prev <= 1 ? prev : prev - 1))}>
                Prev
            </Link>

            {getBtn()}
            <Link
                to="/"
                className={`${styles.link} ${currentPage === allPages ? styles.disabled : ''}`}
                onClick={() =>
                    setCurrentPage((prev: number) => (prev >= allPages ? prev : prev + 1))
                }>
                Next
            </Link>
        </div>
    );
};

export default Pagination;
