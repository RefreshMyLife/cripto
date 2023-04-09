import React from 'react';
import './CointItem.module.scss';
import styles from './CointItem.module.scss';
const CoinItem = ({ coin }: any) => {
    return (
        <div className={styles.coin_row}>
            <p>{coin.rank}</p>
            <div className={styles.symbol}>
                <span>{coin.symbol}</span>
                <p> ({coin.name})</p>
            </div>
            <p>{Number(coin.priceUsd).toFixed(2)}$</p>
            <p
                className={`${styles.hide__mobile} ${
                    Number(coin.changePercent24Hr) > 0
                        ? styles.change__percent_green
                        : styles.change__percent_red
                }`}>
                {Number(coin.changePercent24Hr).toFixed(2)}%
            </p>
            <p className={styles.hide__tablet}>{Number(coin.volumeUsd24Hr).toFixed(2)}$</p>
            <p className={styles.hide__laptop}>{Number(coin.marketCapUsd).toFixed()}$</p>
            <span className={styles.btn}>+</span>
        </div>
    );
};

export default CoinItem;
