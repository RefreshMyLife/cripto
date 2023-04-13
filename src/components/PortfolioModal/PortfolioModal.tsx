import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './PortfolioModal.module.scss';
import { CoinContext } from '../../App';
import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { CoinInfo, ICoin } from '../../models/ICoin';
import { getTotalPriceCoins } from '../utils/utils';

const PortfolioModal: FC<{
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ active, setActive }) => {
    const {
        coinInfo,
        setTotalPriceCoins,
        totalPriceCoins,
        setCurrentCoinData,
        currentCoinData,
        setRemoveCoinItem,
    } = useContext(CoinContext);
    const [removeCoin, setRemoveCoin] = useState('');
    const arrCoin = useRef<CoinInfo[]>([]);
    const currentCoins = useRef<CoinInfo[]>([]);
    let currentRemoveCoin: CoinInfo[] = [];
    let repeatValue = false;
    const localCoin = JSON.parse(localStorage.getItem('coins') || '[]');

    const handleCoin = () => {
        if (localCoin) {
            arrCoin.current = [...localCoin];
        }

        if (coinInfo?.coin) {
            arrCoin.current.map((coinItem: CoinInfo) => {
                if (coinItem.coin.id === coinInfo?.coin.id) {
                    coinItem.coinsBought += +coinInfo.coinsBought;
                    repeatValue = true;
                }
            });
            if (!repeatValue) {
                arrCoin.current.push(coinInfo);
            }
            // setCurrentCoinData(arrCoin.current);
            localStorage.setItem('coins', JSON.stringify(arrCoin.current));
        }
    };

    const handleButtonRemoveCoin = (id: string) => {
        currentRemoveCoin = [...currentCoinData];
        let removeItem: any;
        arrCoin.current.map((item: CoinInfo, index) => {
            if (item.coin.id === id) {
                arrCoin.current.splice(index, 1);
                removeItem = item;
                item.coin.priceUsd;
            }
        });

        setRemoveCoinItem(removeItem.coinsBought * removeItem.coin.priceUsd);
        localStorage.setItem('coins', JSON.stringify(arrCoin.current));

        setTotalPriceCoins(getTotalPriceCoins(arrCoin.current));
        return arrCoin;
    };

    useEffect(() => {
        handleCoin();

        currentCoins.current.push(coinInfo);
        setCurrentCoinData(currentCoins.current);
        setTotalPriceCoins(getTotalPriceCoins(arrCoin.current));
    }, [coinInfo, arrCoin]);

    useEffect(() => {
        if (localCoin) {
            arrCoin.current = [...localCoin];
        }
    }, []);

    return (
        <div
            className={active ? styles.active + ' ' + styles.modal : styles.modal}
            onClick={() => setActive(false)}>
            <div className={styles.modal__container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.total__price}>Total price {totalPriceCoins} $</div>
                {coinInfo?.coin || localCoin ? (
                    <div>
                        <div className={styles.coin_row}>
                            <p>#</p>
                            <div className={styles.symbol}>
                                <span>Coin</span>
                            </div>
                            <p>Price</p>
                            <p>24Hr%</p>
                            <p>You Coins</p>
                        </div>
                        {arrCoin.current.map((item, index) => (
                            <PortfolioItem
                                setRemoveCoin={setRemoveCoin}
                                item={item}
                                removeItem={handleButtonRemoveCoin}
                                key={index}
                            />
                        ))}
                    </div>
                ) : (
                    <h2>Портфель пуст</h2>
                )}
            </div>
        </div>
    );
};

export default PortfolioModal;
