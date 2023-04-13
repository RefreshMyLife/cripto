import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICoin, ICoinHistory } from '../../models/ICoin';
import CoinsService from '../../services/CoinServise';
import styles from './Coin.module.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import AddModal from '../../components/AddModal/AddModal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const Coin = () => {
    const [coin, setCoin] = useState<ICoin>();
    const [coinHistory, setCoinHistory] = useState<ICoinHistory[]>();
    const { coinId } = useParams();
    const [activeModal, setActiveModal] = useState(false);

    const fetchCoin = async () => {
        coinId && setCoin(await CoinsService.fetchCoinById(coinId));
    };
    const fetchHistory = async (time: string) => {
        coinId && setCoinHistory(await CoinsService.fetcHistoriCoin(coinId, time));
    };
    useEffect(() => {
        fetchCoin();
        fetchHistory('d1');
    }, []);

    function handleButtonClick(): void {
        setActiveModal(true);
    }

    return coin ? (
        <div>
            <div>
                <div className={styles.coin__container}>
                    <div className={styles.content}>
                        <h1>{coin.name}</h1>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.rank}>
                            <span className={styles.rank__btn}>Rank # {coin.rank}</span>
                            <button className={styles.btn} onClick={() => handleButtonClick()}>
                                Buy Coin
                            </button>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.coin__heading}>
                                <p>{coin.name}</p>
                                {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
                            </div>
                            <div className={styles.coin__price}>
                                {<h1>{Number(coin.priceUsd).toFixed(2)} $</h1>}
                            </div>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.stats}>
                            <div className={styles.left}>
                                <div className={styles.row}>
                                    <h4>Supply</h4>
                                    <p>{Number(coin.supply).toFixed(2)} $</p>
                                </div>
                                <div className={styles.row}>
                                    <h4>Max supply</h4>

                                    <p>{Number(coin.maxSupply).toFixed(2)} $</p>
                                </div>
                                <div className={styles.row}>
                                    <h4>Change Percent 24Hr</h4>
                                    <p>{Number(coin.changePercent24Hr).toFixed(2)} $</p>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.row}>
                                    <h4>Market Cap Usd</h4>
                                    <p>{Number(coin.marketCapUsd).toFixed(2)} $</p>
                                </div>
                                <div className={styles.row}>
                                    <h4>Volume Usd 24Hr</h4>
                                    <p>{Number(coin.volumeUsd24Hr).toFixed(2)} $</p>
                                </div>
                                <div className={styles.row}>
                                    <h4>Vwap 24Hr</h4>
                                    <p>{Number(coin.vwap24Hr).toFixed(2)} $</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <table>
                            <thead>
                                <tr>
                                    <th className={styles.time} onClick={() => fetchHistory('h1')}>
                                        1h
                                    </th>
                                    <th className={styles.time} onClick={() => fetchHistory('d1')}>
                                        d1
                                    </th>
                                    <th className={styles.time} onClick={() => fetchHistory('m1')}>
                                        m1
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <Line
                            data={{
                                labels: coinHistory?.map((coin) => {
                                    let date = new Date(coin.time);

                                    return `${
                                        date.getDay() < 10
                                            ? '0' + (date.getDay() + 1)
                                            : date.getDay()
                                    }.${
                                        date.getMonth() < 10
                                            ? '0' + (date.getMonth() + 1)
                                            : date.getMonth()
                                    }. ${date.getFullYear()}`;
                                }),

                                datasets: [
                                    {
                                        data: coinHistory?.map((coin) => coin.priceUsd),
                                        label: coin.name,

                                        borderColor: '#EEBC1D',
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            <AddModal active={activeModal} setActive={setActiveModal} coin={coin} />
        </div>
    ) : (
        <div>..isLoading</div>
    );
};

export default Coin;
