import { FC, useState } from 'react';
import './CointItem.module.scss';
import styles from './CointItem.module.scss';
import { ICoin } from './../../models/ICoin';
import AddModal from './../AddModal/AddModal';
import { Link } from 'react-router-dom';

const CoinItem: FC<{ coin: ICoin }> = ({ coin }) => {
    const [activeModal, setActiveModal] = useState(false);

    return (
        <>
            <div className={styles.coin_container}>
                <Link to={`/coin/${coin.id}`} className={styles.coin_row}>
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
                    <p className={styles.hide__laptop}>{Number(coin.marketCapUsd).toFixed(2)}$</p>
                </Link>
                <button className={styles.btn} onClick={() => setActiveModal(true)}>
                    +
                </button>
            </div>
            <AddModal active={activeModal} setActive={setActiveModal} coin={coin} />
        </>
    );
};

export default CoinItem;
