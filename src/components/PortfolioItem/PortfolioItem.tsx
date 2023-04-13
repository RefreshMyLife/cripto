import React, { FC } from 'react';
import styles from './PortfoilioItem.module.scss';
import { CoinInfo } from '../../models/ICoin';
const PortfolioItem: FC<{
    item: CoinInfo;
    removeItem: (id: string) => void;
    setRemoveCoin: React.Dispatch<React.SetStateAction<string>>;
}> = ({ item, removeItem, setRemoveCoin }) => {
    const handleRemoveItem = () => {
        removeItem(item.coin.id);
        setRemoveCoin(item.coin.id);
    };

    return (
        <div className={styles.coin_row}>
            <p>{item.coin.rank}</p>
            <div className={styles.symbol}>
                <span>{item.coin.symbol}</span>
            </div>
            <p>{Number(item.coin.priceUsd).toFixed(2)}$</p>
            <p
                className={`${styles.hide__mobile} ${
                    Number(item.coin.changePercent24Hr) > 0
                        ? styles.change__percent_green
                        : styles.change__percent_red
                }`}>
                {Number(item.coin.changePercent24Hr).toFixed(2)}%
            </p>
            <p>{item.coinsBought}</p>
            <button className={styles.btn} onClick={() => handleRemoveItem()}>
                -
            </button>
        </div>
    );
};

export default PortfolioItem;
