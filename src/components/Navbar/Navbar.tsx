import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

import styles from './Navbar.module.scss';
import PortfolioModal from '../PortfolioModal/PortfolioModal';
import { CoinContext } from '../../App';
import { ICoin } from '../../models/ICoin';
import { getTotalPriceCoins } from '../utils/utils';

const Navbar: FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(false);

    const { coins, totalPriceCoins, currentCoinData, removeCoinItem } = useContext(CoinContext);
    const totalPriceCurrentCoins = getTotalPriceCoins(currentCoinData.splice(0, 1));
    const changePercentPricePortfolio = useRef<number>(0);

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    const handleRemoveCoinPercent = () => {
        if (!isFinite((removeCoinItem * 100) / totalPriceCoins)) {
            return (changePercentPricePortfolio.current = 0);
        }
        changePercentPricePortfolio.current -= !Number.isNaN(
            (removeCoinItem * 100) / totalPriceCoins,
        )
            ? (removeCoinItem * 100) / totalPriceCoins
            : 0;
    };
    const handleAddCoinPercent = () => {
        changePercentPricePortfolio.current += !Number.isNaN(
            (totalPriceCurrentCoins * 100) / totalPriceCoins,
        )
            ? (totalPriceCurrentCoins * 100) / totalPriceCoins
            : 0;
    };
    handleAddCoinPercent();
    useEffect(() => {
        handleRemoveCoinPercent();
    }, [removeCoinItem, totalPriceCoins]);
    useEffect(() => {
        handleAddCoinPercent();
        console.log('teststtststs');
    }, [totalPriceCoins]);

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };
    const handlePortfolioButton = () => {
        setActiveModal(true);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__content}>
                    <Link to="/" className={styles.header__content__logo}>
                        Andreu Zakharoy
                    </Link>
                    <nav
                        className={`${styles.header__content__nav}  ${
                            menuOpen && size.width < 768 ? `${styles.isMenu}` : ''
                        } }`}>
                        <ul>
                            {coins.slice(0, 3).map((coin: ICoin) => {
                                return <li key={coin.symbol}>{coin.id + ' ' + coin.priceUsd}</li>;
                            })}
                            <li>
                                You money {totalPriceCoins} ${' '}
                                <span
                                    className={
                                        changePercentPricePortfolio.current >= 0
                                            ? styles.percent__change
                                            : styles.percent__change_red
                                    }>
                                    <br />
                                    {Number.isNaN(changePercentPricePortfolio.current)
                                        ? 0
                                        : changePercentPricePortfolio.current}{' '}
                                    %
                                </span>
                            </li>
                            <li>
                                <button
                                    className={styles.btn}
                                    onClick={() => handlePortfolioButton()}>
                                    Портфель
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.header__content__toggle}>
                        {!menuOpen ? (
                            <BiMenuAltRight onClick={menuToggleHandler} />
                        ) : (
                            <AiOutlineClose onClick={menuToggleHandler} />
                        )}
                    </div>
                </div>
            </header>
            <PortfolioModal active={activeModal} setActive={setActiveModal} />{' '}
        </>
    );
};

export default Navbar;
